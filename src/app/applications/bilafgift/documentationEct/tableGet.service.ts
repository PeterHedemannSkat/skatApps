
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'; 
import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import { intervalConstructer } from './intervalClass.bilafgifter';
import { tableTransformerFromDAPstructure } from '../services/DAP_JsonDataMapping';
import { tableColumn } from '../services/tableColumnClass';
import { specialValues, tableData, languageText, intervals } from '../infrastructure/interfaces.bilafgifter'


@Injectable()
export class getTableData {

    constructor (private jsonp:Jsonp) {}

    tableIntervals(id:string,year:number,value?:number):Observable<tableColumn> {

        return Observable.create((observer:any) => {

            this.getTableColumnData(id,year).subscribe(data => {

                observer.next(new tableColumn(
                    new intervalConstructer(id).getInterval(),
                    data,
                    id
                ))
            })            
        })
    }

    getTableColumnData(id:string,year:number):Observable<tableData> {

        return this.bilAfgiftData()
            .map(response => {
                return new tableTransformerFromDAPstructure(response,id).getData(year)
            })

    }

    bilAfgiftData():Observable<languageText[]> {
       return this.jsonp.get('http://skat.dk/websrv/jsong.ashx?Id=137464&callback=JSONP_CALLBACK&clear=1')
            .map(res => {
                return res.json()
            })
            .share()
    }


} 

