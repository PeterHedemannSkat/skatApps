import { validTypes } from '../infrastructure/interfaces.bilafgifter';
import { Injectable } from '@angular/core';
import { dataMapping,basePeriods,languageText,tableData } from '../infrastructure/interfaces.bilafgifter'
import { yearDataMapping,smartIntervalTypeMapping } from '../data/mapping.data';
import { Observable } from 'rxjs/Observable'; 
import { tableTransformerFromDAPstructure } from '../services/DAP_JsonDataMapping';
import { Jsonp } from '@angular/http';
import { columnSearch } from './columnIDstringCheck';
import { valuePairs } from '../infrastructure/interfaces.bilafgifter';
import { ColumnPairing } from './columnIDsNeedBasedOnModel';
import { columnIDRules } from '../data/columnDataRules';
import { dataHandlerMaster } from './masterDataClass';



@Injectable()
export class columnID {

    constructor (private jsonp:Jsonp) {}

    private getColumnMetaData(columnID:string) {

       return  yearDataMapping.find(el => {                   
            return new columnSearch(el.validFor).checkColumnID(columnID)          
        })

    } 

    testModel() {
        return smartIntervalTypeMapping.find(el => {
            return new columnSearch(el.validFor).checkColumnID('')
        })
    }

    getDataAllSource(model:valuePairs[],year:number):Observable<dataHandlerMaster> {
        
        let columnsNeeded   = new ColumnPairing(model,columnIDRules).getColumns(),
            observableArray = columnsNeeded.map(id => this.getTableColumnData(id,year))

        let joined:Observable<tableData[]> = Observable.forkJoin.apply(Observable.forkJoin,observableArray) 
        
        return joined.map(el => {
            return new dataHandlerMaster().initDataStructure(el)   
        })

    }

    getTableColumnData(id:string,year:number):Observable<tableData> {

        let metaData = this.getColumnMetaData(id),
            yearKey  = this.getYearKey(year,metaData)


        return this.bilAfgiftData()
            .map(response => {
                return new tableTransformerFromDAPstructure(response,id).getData(yearKey)
            })

    }

    private bilAfgiftData():Observable<languageText[]> {
       return this.jsonp.get('http://skat.dk/websrv/jsong.ashx?Id=137464&callback=JSONP_CALLBACK&clear=1')
            .map(res => {
                return res.json()
            })
            .share()
    }

    private getYearKey(year:number,columnMetaData:dataMapping) {

        return (columnMetaData.multiYearBase)
            ? this.getbaseFromPeriod(year,columnMetaData.periods)
            : year
    }

    private getbaseFromPeriod(year:number,periods:basePeriods[]) {
        return periods.find(v => {
            return (v.from <= year && v.to >= year) 
        }).baseYear
    }

    private columnMetaData:dataMapping

}