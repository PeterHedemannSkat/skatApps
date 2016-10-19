import { Injectable } from '@angular/core';
import { taxableIncome } from './taxableincome.service'


interface TaxCard {
    withHoldingRate:string,
    deduction:string
}

interface Income {
    appliedTaxCard:string,
    sum:string,
    period:string,
    type:string,
    from:string
}


Injectable()
export class WizardState {

    taxcard:TaxCard = {
        deduction:"",
        withHoldingRate:""
    }  

    incomes: taxableIncome[] = []

    thisincome:number = 0
    
    createIncome ():void {

        let hovedkortExists = this.incomes.reduce((p,v) => {
                return p === true ? true : (v.income.appliedTaxCard === 'hovedkort')
        },false)

        let skattekort = hovedkortExists ? 'bikort' : 'hovedkort'

        console.log(skattekort)

        this.incomes.push(new taxableIncome(this,{
            appliedTaxCard:skattekort,
            sum:"",
            period:"monthly",
            type:"loonIndkomst",
            from:""
        }))
    } 

    moveHovedkort (from:number,to:number) {
        this.incomes[from].income.appliedTaxCard = "bikort";
        this.incomes[to].income.appliedTaxCard = "hovedkort";
    }

    trin:number = 0;
    language:string;

}   