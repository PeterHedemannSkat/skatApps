import { intervalsBilafgifter } from '../data/intervals.data.bilafgift';
import { intervals } from '../infrastructure/interfaces.bilafgifter';
import { intervalMapping,smartIntervalTypeMapping } from '../data/mapping.data';
import { columnSearch } from './columnIDstringCheck';


export class intervalConstructer {

    constructor(private columnIDs:string[]) {}

    /* 
        look for the columns in the table
        if they are ejerAfgift diesel and benzin the use diesel
    */

    getInterval():intervals[] {

        let intervalObj = this.getIntervalObj(),
            len         = intervalObj.data.length,
            fromArray   = intervalObj.data.slice(0,len-1),
            toArray     = intervalObj.data.slice(1),
            type        = smartIntervalTypeMapping.find(el => {
                return new columnSearch(el.validFor).checkColumnID(intervalObj.id) 
            }).tableType

        let interval:intervals[] = new Array(len-1)

        if (type == 'kmPrLiter') {  
            toArray = toArray.map(v => Number((v - 0.1).toFixed(1))); 
        } else if (type == 'vaegtKg') {
            fromArray = fromArray.map(v =>v + 1);
        }

        for (let i = 0; i < len-1; i++) {
            interval[i] = new intervals(fromArray[i],toArray[i])
        }

        return interval
    }

    getIntervalObj() {

        let intervalKey = this.getTableKey()
        let  intervalId  = intervalMapping.find(val => val.ids.indexOf(intervalKey) > -1).table

        return intervalsBilafgifter.find(v => intervalId == v.id)

    }

    private getTableKey() {

       if (this.columnIDs.length == 2) {

            let both = ['_car&van_ejerAfgift_forbrugsAfgift_','_car&van_ejerAfgift_udligning_']
            
            let isConcurrent = both.reduce((p,v) => {
                return (this.columnIDs.indexOf(v) == -1) ? false : true
            },true)

            return (isConcurrent) 
                ? /* the specialCase */ '_car&van_ejerAfgift_udligning_' 
                : /* they refer both to the same intervalindex  */ this.columnIDs[0]

        } else if (this.columnIDs.length == 1) {

            return this.columnIDs[0]
        }
        

    }

    inputType() {
        return smartIntervalTypeMapping
                .find(el => {
                    return new columnSearch(el.validFor).checkColumnID(this.getIntervalObj().id) 
                }).tableType    
    }


}
