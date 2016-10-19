import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'; 
import { languageText } from '../../../shared/interfaces/interfaceslanguage';

@Injectable()
export class skattekortText {

    text:languageText[] = []; 

    url:string = 'websrv/json.ashx?pId=66629&type=4'
    //url:string = 'app/textHolder.json';

    constructor (private http:Http) {}

    getText():Observable <languageText[]> {

        return Observable.create((observer:any) => {
            if (this.text.length > 0) {
                observer.next(this.text)
            } else {
                this.http.get(this.url)
                    .map(response => response.json())
                    .subscribe(text => {
                        this.text = text;
                        observer.next(text)
                    })   
            }    
        })
    }
}





  