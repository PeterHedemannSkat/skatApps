import { validTypes } from '../infrastructure/interfaces.bilafgifter';
import { Injectable } from '@angular/core';
import { dataMapping,basePeriods,languageText,tableData,dataStore,subDataStore } from '../infrastructure/interfaces.bilafgifter'
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
    isLoadingData:boolean
    model:valuePairs[]
    cachedDataMaster:dataHandlerMaster
    dataStore:dataStore[];
    totalStore:languageText[]

    private getColumnMetaData(columnID:string) {

       return  yearDataMapping.find(el => {                   
            return new columnSearch(el.validFor).checkColumnID(columnID)          
        })

    } 

    getDataAllSource(model:valuePairs[],year:number,userInput:string):Observable<dataHandlerMaster> {

        this.model = model
        
        let columnsNeeded   = new ColumnPairing(model,columnIDRules,userInput).getColumns(),
            observableArray = columnsNeeded.map(id => this.getTableColumnData(id,year))

        let joined:Observable<tableData[]> = Observable.forkJoin.apply(Observable.forkJoin,observableArray)

        if (columnsNeeded.length > 0) this.isLoadingData = true

        if (columnsNeeded.length == 0) return Observable.from([new dataHandlerMaster().initDataStructure([],model)])
        
        return joined.map(el => {

            this.isLoadingData       = false;

            return new dataHandlerMaster().initDataStructure(el,model);

        })

    }

    getTableColumnData(id:string,year:number):Observable<tableData> {

        let metaData = this.getColumnMetaData(id),
            yearKey  = this.getYearKey(year,metaData)
        
        return this.bilAfgiftData()
            .map(response => {
                return new tableTransformerFromDAPstructure(response,id).getData(yearKey)
            })
            .map(el => {
                /* determine if columnID should be modifed */
                return this.modifiersForSpecialCases(el)
            })

    }

    private bilAfgiftData():Observable<languageText[]> {

       return (this.totalStore && this.totalStore.length > 1) 
            ?  Observable.from([this.totalStore])
            :  this.jsonp.get('http://skat.dk/websrv/jsong.ashx?Id=137464&callback=JSONP_CALLBACK&clear=1')
                .map(res => {
                    let data = res.json()
                    this.totalStore = data
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

    modifiersForSpecialCases(data:tableData):tableData {

       let specialFnContainer = [
            {
                key:'privatBenyttelse',
                fn:(el:tableData) => {

                    let map = [
                            {key:'job',val:0},
                            {key:'mixed',val:0.5},
                            {key:'private',val:1}
                        ]

                    let privat      = this.model.find(el => el.prop == 'privateUsage').val,
                         newValue   = data.columnData[0] * map.find(el => el.key == privat).val,
                         copy       = Object.assign({},data) 

 
                    copy.columnData[0] = newValue 

                    return copy

                }
            },
            {
                key:'checkIftaxaUdligning',
                fn:(el:tableData) => {

                    let vehicle = this.model.find(el => el.prop == 'vehicle').val

                    if (vehicle == 'taxa') {
                        let copy = Object.assign({},data) 
                        copy.columnData = copy.columnData.map(el => el * 2)

                        return copy

                    } else {
                        return el
                    }    
                }
            }
       ]

        let mapping = [
            {valid:!!data.id.match('_privatAnvendelsesAfgift_'),key:'privatBenyttelse'},
            {valid:data.id == '_car&van_ejerAfgift_udligning_',key:'checkIftaxaUdligning'}    
        ]

        /*  here we colud put kw transformation */
       
       let isSpecial = mapping.find(el => el.valid == true)

       if (isSpecial) {
            return specialFnContainer.find(el => el.key == isSpecial.key).fn(data)
       } else {
           return data
       }


    }

    private columnMetaData:dataMapping

}