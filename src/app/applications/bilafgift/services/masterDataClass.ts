import { tableData,singleData,specialValues,cellExtract,calculatedData,valuePairs,intervals } from '../infrastructure/interfaces.bilafgifter';
import { intervalConstructer } from './intervalClass.bilafgifter';
import { period } from '../../kalenderApp/infrastructure/types';



export class dataHandlerMaster {

    private tableColumns:tableData[];
    public individualData:tableData[];
    isReady:boolean;
    private model:valuePairs[]
    private isEmpty:boolean = false;

    allData:tableData[]

    inputType:string; 
    interval:intervals[]

    initDataStructure(tableColumns:tableData[],model:valuePairs[],userInput?:string) {
        
         if (tableColumns.length == 0) {
             this.isEmpty = true
             return this
         }
        
        this.allData    = tableColumns
        this.model      = model

        this.tableColumns   = tableColumns.filter(el => el.type == 'table').sort((a,b) => {

            let isUdligning = a.id.match(/udligning/)
            return (isUdligning) ? 1 : -1

        })

        this.individualData = tableColumns.filter(el => el.type == 'singleData')

        /* if we are asked for partikelFilter, privatAnvendelse ect. and tables are undetermined we should not return anything  */
        if (this.tableColumns.length == 0) {
            this.isEmpty = true
            return this  
        }

        let interval_ = new intervalConstructer(this.getNamesOfColumns(tableColumns))
        this.inputType      = interval_.inputType()
        this.interval       = interval_.getInterval()
   
     /* below smaller manipulations due to the data structure, eg. the forbrugsafgift array is suited for both udligning and forbrugsafgift. Therefore we need to chop the last 3 elements  */
        let isSpecialcase = !!this.tableColumns.find(el => el.id == '_car&van_ejerAfgift_forbrugsAfgift_') && this.tableColumns.length == 1 

        if (isSpecialcase) {
            this.tableColumns[0].columnData.splice(-3,3)
        }

        if (this.inputType == 'kmPrLiter') this.reverseColumns()
        
        let filterAfgift_ = this.allData.find(el => el.id === '_particleFilter_' || el.id === '_van_particleFilter_vaegtAfgift_')

       

        if (filterAfgift_ && this.allData.length > 1  ) {
            
             console.log(filterAfgift_.columnData[0])

            let period = this.getPeriodOfIndex(this.getIndex(Number(userInput)) )
            console.log(period)

            if (period > 1) {
                filterAfgift_.columnData[0] = filterAfgift_.columnData[0]/period
                filterAfgift_.period.period = period;
            }
        }

        return this
    }

    update(input: string) {
        console.log('inputChange')
        let filterAfgift_ = this.allData.find(el => el.id === '_particleFilter_' || el.id === '_van_particleFilter_vaegtAfgift_')

       

        if (filterAfgift_ && this.allData.length > 1  ) {
            
             console.log(filterAfgift_.columnData[0])

            let period = this.getPeriodOfIndex(this.getIndex(Number(input)) )
            console.log(period)

            if (period > 1) {
                filterAfgift_.columnData[0] = filterAfgift_.columnData[0]/period
                filterAfgift_.period.period = period;
            }
        }
        return false
    }

    reverseColumns() {
        /* only relevant when we show ejerAfgifter where it's more logical for USER that the cost/afgifter increses in the table */
        this.interval.reverse()
        this.tableColumns.forEach(column => {
            column.columnData.reverse()
        })

    }

    columnsOfTable() {

        return this.tableColumns.length
    }

    getColumnNames() {
        return this.tableColumns
            .filter(el => el.type == 'table')
            .map(el => el.id)
            .sort((a,b) => {

                let isUdligning = a.match(/udligning/)
                return (isUdligning) ? 1 : -1

            })                     
    }

    getPeriodOfIndex(index?:number) {

        /* assuming that each row in the table has the same period, otherwise something is wrong... looking at first table should do  */
        return this.tableRowsHasDifferentPeriods()
            ? this.tableColumns && this.tableColumns[0] && this.tableColumns[0].period.periodIndex[index]
            : this.tableColumns && this.tableColumns[0] && this.tableColumns[0].period.period

    }

    getCommonTablePeriod() {

        return this.tableColumns && this.tableColumns[0] && this.tableColumns[0].period.period

    }

    tableRowsHasDifferentPeriods() {

        return this.tableColumns && this.tableColumns[0] && !this.tableColumns[0].period.same

    }

    getNamesOfColumns(tableColumns:tableData[]) {
        return tableColumns
            .filter(el => el.type == 'table')
            .map(el => el.id)
    }

    getValueInColumn(id:string,index:number,value?:number) {

        let column_ = this.tableColumns.find(el => el.id == id)


    }

    getIndex(value:number) {
    
        return this.interval.findIndex((el) => {
            return (value >= el.from && value <= el.to)
        })

    }

    getValue(id:string,value:number) {
       
        let index = this.getIndex(Number(value))
        
        return (index > -1) ? this.getValue_fromIndex(index,id,value) :-1
    }

    isVariableIndependent() {

        return this.allData.reduce((p,v) => {

            return (v.type == 'table') 
                ? v.columnData.length > 1 || v.specialData
                    ? false
                    : p
                : p

        },true)

    }

    getAllValuesFromUserInput(userValue:string) {

        if (!userValue && !(this.isVariableIndependent())) return []

        let formattedVal:number,index:number

        if (userValue) {
                formattedVal   = Number(userValue.replace(/,/,'.')),
                index          = this.getIndex(Number(formattedVal))
        } else {
                formattedVal   = 1;
                index          = 0; 
        }

        let allData = this.allData.map(data => {

            let period  = {period:data.period,id:data.id,index:index,type:data.type},
                index_  = (data.type == 'singleData') ? 0 : index,
                values  = this.getValue_fromIndex(index_,data.id,formattedVal),
                 prop   = new printValue(Object.assign(values,period))  
                
            return prop
        })
  
        return allData

    }

    containsTable() {

        return this.tableColumns && !!this.tableColumns[0]

    }

    singleInterval(interval:intervals) {
        return interval.from == 1 && interval.to == Number.POSITIVE_INFINITY
    }

    getTotal(userValue:string) {

        if (!userValue && !this.isVariableIndependent()) return -1

        return this.getAllValuesFromUserInput(userValue).reduce((p,v) => {
            return p + v.data.val * v.periodsPrYear()
        },0)
    }

    getTotalPeriod(userValue:string) {

        if (!userValue && !this.isVariableIndependent()) return -1

        return this.getAllValuesFromUserInput(userValue).reduce((p,v) => {
            return p + v.data.val
        },0)
    }

    getValue_fromIndex(index:number,id:string,value?:number):cellExtract {

        let len     = this.interval.length,
            column_ = this.allData.find(el => el.id == id)

        if (index == 0 || index == (len - 1)) /* is potential a special type (x pr y), but not necessary ...  */ {

            let isSpecial = column_.specialData

            if (isSpecial) {

                let specialKey  = (index == 0) ? 'start' : 'end',               
                     specialObj = isSpecial.find(el => el.id == specialKey)

                    /* 
                        we ask for index 0 and we look in a object which is special, but with an end index (thus end property) 
                        in this case we are in specialObj. We will look for a start property but will not find it  
                        that's why we guard with if(specialObj)
                    */ 

                if (specialObj) {

                    if (!value) {
                        return {
                            val:-1,
                            object:specialObj
                        }
                    } else {

                        return {
                            val:this.specialCalculations(specialObj,value),
                            object:specialObj
                        } 
                    }

                } else {

                    return {
                        val:column_.columnData[index]                                 
                    }           
                }

            } else /* it wasn't anyway special */ {

                return {
                    val:column_.columnData[index]                                 
                }   
                    

            }

        } else /* is a normal index - not start nor end  */ {
            /* if start we need to add one! */

            let isSpecial = column_.specialData

            if (isSpecial && isSpecial.find(el => el.id == 'start')) index--;

            return {
                val:column_.columnData[index]                                 
            }             

        }
    }

    containsSingleData() {
        
        return this.individualData.length > 0
    }

    private closestHundredUp(value:number,m:number) {

        value = Number(value)

        let mod = value % m

        return (mod > 0) ? (value + m - mod) : value

    }

    private specialCalculations(special:specialValues, value:number) {

        /* default, round up to nearest 100 */

        

        let mod = value % special.units

        let valueRoundedUp = (mod > 0) ? (value + special.units - mod) : value

        return Math.round((valueRoundedUp / special.units) * special.val)


    }
}

export class printValue {

    constructor(public data:calculatedData) {

    }

    periodsPrYear() {
       
        let period_ = this.data.period,
             period = this.data.period.same 
                ? period_.period 
                : period_.periodIndex[this.data.index] 
        
        return period

    }

    sum() {
        return this.data.val * this.periodsPrYear()
    }

    isUdligning() {
        return this.data
        //return  !!this.data.id.match(/udligning/)
    }

    specialLoad() {
        return this.data.object ?  this.data.object : undefined 
    }

}