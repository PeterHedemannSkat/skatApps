import { Injectable } from '@angular/core';
import { Inject } from '@angular/core'
import { Observable } from 'rxjs/Observable'; 
//import { languageText } from '../../../shared/interfaces/interfaceslanguage';
import { ErrorContainer } from '../data/validation.data';
import { gaveAfgiftBeregninger } from './gaveAfgiftCalculation.service';
import { Http, Response } from '@angular/http';

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

        

        this.getContent<languageText>(['mainCategories'],'app/txt.json')
            .map(el => el.da)

        this.mainCategories_()

     
    }

    mainCategories():Observable<languageText> {

        return this.getContent<languageText>(['mainCategories'],'app/txt.json')

            
    }

    mainCategories_(){

        this.getContent<languageText>(['mainCategories'],'app/txt.json')
            .subscribe(txt => {
                 console.log(txt)
            })
            
    }





    getContent <T extends basic<T>> (ids:string[],url:string):Observable<T> {

        return Observable.create((observer:any) => {

            this.data<T[]>('app/txt.json').subscribe(sats => {

                let level:T[] = sats;

                ids.forEach(id => {
                    level = <T[]>level.find(el => el.id == id).children
                })

                observer.next(level)
                /*
                level.forEach(node => {
                    observer.next(node)
                })*/

            })
        })   
    }

    data <T> (url:string):Observable <T> {
        return this.http.get(url).map(response => {
            return this.production ? response.json() : response.json().data 
        }).share()

    }

    


    beregnService:gaveAfgiftBeregninger = new gaveAfgiftBeregninger()

    calculateGave () {

        //this.beregnService.modtagerFaar = 100000;
        this.beregnService.gaveAfgiftPct = 15;
        this.beregnService.fradrag = 61500;
        this.beregnService.giverBetalerAfgift = true
        
        let a = this.beregnService.afgiftBeloeb()
        
        console.log(a)

    }    

   
    


    

    
   
}   