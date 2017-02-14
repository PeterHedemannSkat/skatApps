import { intervalsBilafgifter } from '../data/intervals.data.bilafgift';
import { specialValues,tableData,languageText } from '../infrastructure/interfaces.bilafgifter'; 
import { specialIntervals } from '../data/mapping.data';
import { columnSearch } from './columnIDstringCheck';
import { periodMapping,singleDataType } from '../data/mapping.data';


export class tableTransformerFromDAPstructure {

    constructor(private allValues:languageText[],private id:string) {}

    getData(year:number):tableData {

        return {
            columnData:this.getData_(year),
            specialData:this.getSpecialValues(year),
            id:this.id,
            period:this.getPeriod(),
            type:this.getDataType()
        }
    } 

    private getPeriod() {

        return periodMapping.find(el => {
             return new columnSearch(el.validFor).checkColumnID(this.id)  
        })

    }

    private getDataType() {

        let isSingle = new columnSearch(singleDataType.validFor).checkColumnID(this.id) 

        return isSingle ? 'singleData' : 'table'
    }

    private getTableData() {

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

    private getRegularColumn() {

        /* assuming it is grouped under COLUMN, when special type  */

        let specials = specialIntervals.find(el => new columnSearch(el).checkColumnID(this.id)) 
  
        this.yearArray = (specials) ? this.currentLayer.children.find(el => el.id == 'column').children : this.currentLayer.children
        
        return this
    }

    private getColumnData(year:number) {

        return this.formatData(this.yearArray,year)
    }

    private getYearObj(obj:languageText[],year:number) {

        return obj.find((yearObj => year == Number(yearObj.id)));

    }

    private formatData(obj:languageText[],year:number) {

        return this.getYearObj(obj,year).da.split(',').map(data => Number(data))

    }

    private getSpecialValues(year:number):specialValues[] {

         let specials = specialIntervals.find(el => new columnSearch(el).checkColumnID(this.id)) 
         
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

    private getData_(year:number) {

        return this
            .getTableData()
            .getRegularColumn()
            .getColumnData(year)

    }



    private yearArray:languageText[];
    private currentLayer:languageText

}
