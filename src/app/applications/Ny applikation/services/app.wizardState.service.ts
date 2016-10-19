import { Injectable } from '@angular/core';

Injectable()
export class WizardState {
    data = {
        korttype:"hovedkort",
        indkomst:"3333",
        traekprocent:"",
        maanedsfradrag:"",
        indkomsttype:"loonIndkomst"
    }

    trin:number = 0;
    language:string;

}   