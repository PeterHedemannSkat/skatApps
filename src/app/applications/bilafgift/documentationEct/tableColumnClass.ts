
import { specialValues,tableData,languageText } from '../infrastructure/interfaces.bilafgifter'; 

/* 
    responsible for data in a single column.
    with getValue you look up the value in the correct row 
    !!Handles special-case where a cell (index) contains an alt. data structure aka 45 pr XX 

  */

export class tableColumn {
    constructor (public intervals:intervals[],public data:tableData,id:string) {}

    /* TODO interval really doesn't belong to this class, but rather a super class   */


    private getIndex(value:number) {

        return this.intervals.findIndex((el) => {
            return (value >= el.from && value <= el.to)
        })

    }

    getValue(value:number) {

        return this.getValue_(this.getIndex(value),value)
    }


    getValue_(index:number,value?:number) {

        let len = this.intervals.length

        if (index == 0 || index == (len - 1)) {

            let isSpecial = this.data.specialData

            if (isSpecial) {

                let specialKey  = (index == 0) ? 'start' : 'end',               
                     specialObj = isSpecial.find(el => el.id == specialKey)

                if (specialObj) {

                    if (!value) {
                        throw console.log('mangler input-værdi!')
                    } else {
                        return this.specialCalculations(specialObj,value)
                    }

                } else {

                    return this.data.columnData[index]  
                    
                }

            } else {

                return this.data.columnData[index]  

            }

        } else {

            return this.data.columnData[index]            

        }
    }

    private specialCalculations(special:specialValues, value:number) {

        /* default, round up to nearest 100 */

        let mod = value % 100

        let valueRoundedUp = (mod > 0) ? (value + 100 - mod) : value

        return (valueRoundedUp / special.units) * special.val


    }

}

export class intervals {
    constructor (public from:number,public to:number) {}
}
