import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'; 
import { languageText } from '../interfaces/interfaceslanguage';

class serviceSpace <T> {

    constructor (public id:string) {}
    catchedData:T[] = []; 
    fecthingData: boolean = false;
    dataObservable: Observable <T[]> 

    executeSubscribe (observer:any) {
        this.dataObservable.subscribe(data => {
            this.fecthingData = false;
            this.catchedData = data;
            this.emitsingle(observer)
        })
    }

    emitsingle (observer:any) {
        this.catchedData.forEach(v => {
            observer.next(v)
        })

        observer.complete()
    }
}

@Injectable()
export class getJSONdata {

    production:boolean = false;
    private catchedServices:serviceSpace<any>[] = []
    
    constructor (private http:Http) {}

    fetchText <languageText> (url:string) {
        return this.fetch<languageText>(url)
    }

    fetch <T>(url:string):Observable <T> {

        let service    = this.catchedServices.find(service => service.id === url)

        /* if not in stack, create it and add it to the holder */
        if (service === undefined) {
            service = new serviceSpace<T>(url)
            this.catchedServices.push(service) 
        }

        return Observable.create((observer:any) => {
            if (service.catchedData.length > 0) {
                service.emitsingle(observer)

            } else if (service.fecthingData) {
                service.executeSubscribe(observer)
  
            } else {
                service.dataObservable = this.http.get(url).map(response => {        
                    return this.production ? response.json() : response.json().data 
                }).share()

                service.fecthingData = true;
                service.executeSubscribe(observer)
            }    
        })
    }

}


