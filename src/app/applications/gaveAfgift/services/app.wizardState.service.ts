import { Injectable } from '@angular/core';
import { Inject } from '@angular/core'
import { Observable } from 'rxjs/Observable'; 
//import { languageText } from '../../../shared/interfaces/interfaceslanguage';
import { ErrorContainer } from '../data/validation.data';
import { gaveAfgiftBeregninger } from './gaveAfgiftCalculation.service';
import { Http, Response } from '@angular/http';
import { importJsonData } from  '../../../shared/shared'

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

Injectable()
export class WizardState {

    production:boolean = false

    
    constructor (@Inject(Http) private http:Http) {

        this.calculateGave()

    }



    beregnService:gaveAfgiftBeregninger = new gaveAfgiftBeregninger()

    calculateGave () {

        //this.beregnService.modtagerFaar = 100000;
        this.beregnService.gaveAfgiftPct = 15;
        this.beregnService.fradrag = 61500;
        this.beregnService.giverBetalerAfgift = true
        

    }    

}   