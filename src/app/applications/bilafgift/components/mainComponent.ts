import { Component, OnInit} from '@angular/core';
import { WizardState} from '../services/app.wizardState.service';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'; 
import { importJsonData,getJSONdata } from  '../../../shared/shared'
import { gavePct,gaveFradragLevel} from '../data/gaveAfgiftFixedRules';
import { gaveData } from '../infrastructure/interfacesGave';
import { gaveAfgiftBeregninger } from '../services/gaveAfgiftCalculation.service';

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

interface detailed {
    id:string,
    description:string
}


@Component({

    selector: 'my-app',

    template:`
        <div class = "skts-wizard bilafgift-afgift skts-app">
        
            <h3>{{txt('overskrift1') | async}}</h3>

            <p>{{txt('introtekst') | async}}</p>

            <selector 
                [options]   = "familyNames | async"
                [label]     = "txt('giverTil') | async"
                [(value)]   = "familyId">
            </selector>

   
        </div>
    
    `

})

export class appMain   {

    constructor (private data:getJSONdata) {

    }

    production:boolean = false;


    txt(id:string):Observable<string> {
        return this.data.fetch<languageText>(this.urlText)
            .find(txt => txt.id == 'textlayer')
            .map(obj => obj.children.find(sub => sub.id == id))
            .map(obj => {return (obj && obj.id) ? obj.da : ''})           
    }

    // testing




}
