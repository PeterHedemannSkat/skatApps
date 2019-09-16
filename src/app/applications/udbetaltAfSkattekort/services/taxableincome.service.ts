import { WizardState } from './app.wizardState.service';

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


export class taxableIncome {

    taxcard:TaxCard = {withHoldingRate:"",deduction:""};
    income:Income = {appliedTaxCard:"hovedkort",sum:"",period:"monthly",type:"loonIndkomst",from:""};

    constructor (private wizardState:WizardState, income?:Income ) {
        this.taxcard = this.wizardState.taxcard
        if (income) {
            this.income = income
        }
    }
    
    deductionForPeriod (): number {

        let converter          = {monthly:12,twoweeks:26},
            deductionprYear    = +this.taxcard.deduction * 12

        return Math.round(deductionprYear/converter[this.income.period]) 

    }

    netincome ():number {
        return (this.deductableAmount() > this.netincome_ambidrag()) ? 0  : (this.netincome_ambidrag() - this.deductableAmount())  
    }

    deductableAmount ():number {
        return (this.eligible_deduction() ? this.deductionForPeriod() : 0)
    }

    netincome_ambidrag ():number {
        return +this.income.sum - this.sumAMbidrag();
    }

    sumAMbidrag ():number {
        return this.eligible_amBidrag() ? Math.round(+this.income.sum * 0.08) : 0;
    }

    eligible_deduction ():boolean {
        return this.income.appliedTaxCard === 'hovedkort'
    }

    eligible_amBidrag ():boolean {
        return this.income.type === 'loonIndkomst'
    } 

    taxOfWithHoldingRate ():number {
        return Math.round(this.netincome() * +this.taxcard.withHoldingRate/100)
    }

    totalTax ():number {
        return this.sumAMbidrag() + this.taxOfWithHoldingRate()
    }

    paid ():number {
        return +this.income.sum - this.totalTax()
    }

}

