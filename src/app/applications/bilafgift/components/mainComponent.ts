import { Component, OnInit} from '@angular/core';
import { WizardState} from '../services/app.wizardState.service';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'; 
import { importJsonData,getJSONdata } from  '../../../shared/shared';
import { Jsonp } from '@angular/http';
import { intervalsBilafgifter,specialIntervals } from '../data/inMemoryData.service'
import { intervalConstructer,intervals } from '../data/bilAfgiftParameters'


interface basic<T> {
    id:string
    children?:basic<T>[]
}

interface languageText {
    id:string,
    da:string,
    en?:string,
    children?:languageText[]
}

interface detailed {
    id:string,
    description:string
}


@Component({

    selector: 'my-app',

    template:`
        <div class = "skts-wizard bilafgift-afgift skts-app">
        
            <h3>bilafgifter IIIXV</h3>


            <!--
            <selector 
                [options]   = "familyNames | async"
                [label]     = "txt('giverTil') | async"
                [(value)]   = "familyId">
            </selector>
            -->

   
        </div>
    
    `

})

export class appMain   {

    constructor (private data:getJSONdata,private jsonp:Jsonp) {

    }

    urlText:string = 'app/txt.json';

    production:boolean = false;


    txt(id:string):Observable<string> {
        return this.data.fetch<languageText>(this.urlText)
            .find(txt => txt.id == 'textlayer')
            .map(obj => obj.children.find(sub => sub.id == id))
            .map(obj => {return (obj && obj.id) ? obj.da : ''})           
    }

    ngOnInit() {



        let a = new intervalConstructer('ejerAfgiftBenzin').getIndexExpanded(9)
 
        this.tableIntervals('vaegtafgiftBenzin',2017).subscribe(response => {
            console.log(response)
        })

        console.log(a)

    }

    year = 2017;


    tableIntervals(id:string,year:number,value?:number):Observable<table> {

        return Observable.create((observer:any) => {

            this.getTableColumnData(id,year).subscribe(data => {

                observer.next(new table(
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

interface specialValues {
    id:string,
    val:number,
    units:number
}

class table {
    constructor (public intervals:intervals[],public data:tableData,id:string) {}
}

interface specialCell {
    rate:number,
    pr:number,
    id:string
}

class columnData {
    constructor (public id:string,public column:number[],public specialCells?:specialCell[]) {}    
}


/* maybe it's chaining crap?  */
class tableTransformerFromDAPstructure {

    constructor(private allValues:languageText[],private id:string) {}

    getTableData() {

        let result:languageText = {id:'false',da:'false'},

            deepIn = (level:languageText[]):languageText => {
                level.forEach((v) => {
                    
                    if (v.id == this.id) result = v;
                    if (v.children && result.id == 'false') deepIn(v.children)
                })

                return result
            }

            this.currentLayer = deepIn(this.allValues); 

            return this

    }

    getRegularColumn() {

        /* assuming it is grouped under COLUMN, when special type  */

        let specials = specialIntervals.find(el => el.id == this.id)




        this.yearArray = (specials) ? this.currentLayer.children.find(el => el.id == 'column').children : this.currentLayer.children
        


        return this
    }

    getColumnData(year:number) {

        return this.formatData(this.yearArray,year)
    }

    getYearObj(obj:languageText[],year:number) {

        return obj.find((yearObj => year == Number(yearObj.id)));

    }

    formatData(obj:languageText[],year:number) {

         return this.getYearObj(obj,year).da.split(',').map(data => Number(data))

    }

    getSpecialValues(year:number):specialValues[] {

         let specials = specialIntervals.find(el => el.id == this.id)  
         
         if (specials) {

            let specialContainer = this.currentLayer.children.find(el => el.id == 'special').children
            
            let yearObj            = this.getYearObj(specialContainer,year),
                checkProperties    = ['da','en'],
                checkOuterProperties = ['end','start']  

           return checkOuterProperties.filter(propertyName => {
                return specialContainer.find(el => el.id == propertyName)})
                    .map(propertyName => {
                        let valueObj = specialContainer.find(el => el.id == propertyName),
                            yearObj  = this.getYearObj(valueObj.children,year)   
   
                        return {
                            id:propertyName,
                            val:Number(yearObj.da),
                            units:Number(yearObj.en)
                                                              
                        }
                    })


         } else {

             return undefined
         
        } 

    }

    getData_(year:number) {

        return this
            .getTableData()
            .getRegularColumn()
            .getColumnData(year)

    }

    getData(year:number):tableData {

        return {
            columnData:this.getData_(year),
            specialData:this.getSpecialValues(year),
            id:this.id
        }
    } 

    private yearArray:languageText[];
    private currentLayer:languageText

}

interface tableData {

    columnData:number[],
    specialData:specialValues[],
    id:string

}