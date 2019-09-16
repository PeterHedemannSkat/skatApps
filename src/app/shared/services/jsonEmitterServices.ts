import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'; 
import { languageText } from '../interfaces/interfaceslanguage';
import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';

interface listType {
    value:string,
    text:string
}

interface listContainer {
    list:listType[],
    id:string
}

interface map {
    id:string,
    data:any,
    observable?:Observable<any>
}

export class importJsonData {

    constructor (@Inject(Http) public http:Http) {}

    production:boolean = false
    dataStore:Observable<any>[] = []
    arrayStore:listContainer[] = []
    diverseStorage:map[] = []

    private jsonDataGet <T> (url:string):Observable <T> {
        return this.http.get(url).map(response => {
            return this.production ? response.json() : response.json().data 
        }).share()
    }   

    jsonDataEmitter<T>(url:string):Observable<T> {
        return Observable.create((observer:any) => {
            this.jsonDataGet<T[]>(url).subscribe(el => {
                Observable.from(el).subscribe(el => {
                     observer.next(el)
                })     
            })
        })
    }

    textArrayIdMap (url:string,containerName:string,lang:string) {
        return this.jsonDataEmitter<languageText>(url)
             .find(obj => obj.id == containerName)
             .map(obj => obj.children.map(sub => {
                 return {
                     value:sub.id,
                     text:sub[lang]
                 }
             }))
    }

    setArrayObservables (url:string,containerName:string,lang:string) {
        this.textArrayIdMap(url,containerName,lang).subscribe(list => {       
            this.arrayStore.push({id:containerName,list:list})         
        })
    }

    setDataStore (url:string,id:string) {
        this.jsonDataEmitter(url).subscribe(data => {       
            this.diverseStorage.push({id:id,data:data})         
        })
    }

    getArrayValues (mainKey:string,value:string) {
        let item = this.arrayStore.find(el => el.id == mainKey)  
        return (item && item.list.find(el => el.value == value)) ? item.list.find(el => el.value == value).text : ''
    }

    setObservables (url:string,containerName:string,nameIds:string[],lang:string) {     
        nameIds.forEach(key => {
            this.dataStore[key] = this.jsonDataEmitter<languageText>(url)
                .find(obj => obj.id == containerName)
                .map(obj => obj.children)
                .map(obj => obj.find(sub => sub.id === key))
                .map(obj => obj[lang])
        })
    }
}