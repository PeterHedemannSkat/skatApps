import { Injectable } from '@angular/core';
import { WizardState } from './app.wizardState.service';

@Injectable()
export class Calculation {

    constructor (
        private wizardState:WizardState
    ) {}

    getSkat():number {
        let netIncome = (this.wizardState.data.korttype === "hovedkort") ? (+this.wizardState.data.indkomst - this.getAMbidrag())  - +this.wizardState.data.maanedsfradrag : +this.wizardState.data.indkomst;
        let skat      = this.getAMbidrag() + netIncome * +this.wizardState.data.traekprocent/100; 
        return Math.round(skat)
    } 

    getAMbidrag ():number {
        let includeMaanedsFradrag = this.wizardState.data.indkomsttype === 'loonIndkomst';
        return includeMaanedsFradrag ? Math.round(+this.wizardState.data.indkomst * 0.08) : 0;
    }

    getUdbetalt ():number {
        return +this.wizardState.data.indkomst - this.getSkat()
    }
}