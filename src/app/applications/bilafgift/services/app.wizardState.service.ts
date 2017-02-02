import { Injectable } from '@angular/core';
import { Inject } from '@angular/core'
import { Observable } from 'rxjs/Observable'; 
//import { languageText } from '../../../shared/interfaces/interfaceslanguage';
import { ErrorContainer } from '../data/validation.data';
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


    }




}   