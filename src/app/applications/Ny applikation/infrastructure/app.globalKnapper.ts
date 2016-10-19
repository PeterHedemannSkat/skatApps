import { Component, Input, OnInit } from '@angular/core';

import { skattekortText } from '../services/skattekort.text';
import { WizardState } from '../services/app.wizardState.service';

@Component({
    selector:'global-buttons',
    template:`
        <hr class = "skts-divider">
            <div class = "clearfix skts-wizard-buttons">
            <input *ngIf = "wizardState.trin > 0"  [value] = "back" type = "button" class = "btn skts-btn-secondary pull-left" [routerLink] = "links[wizardState.trin - 1]">   
            <input *ngIf = "wizardState.trin < links.length-1"  [value] = "forward" type = "button" class = "btn btn-primary pull-right" [routerLink] = "links[wizardState.trin +1]">     
        </div>
    `
})

export class globalButtoms {

    @Input()
    links:string[];
    forward:string;
    back:string;

    constructor (
        private textServices: skattekortText,
        private wizardState: WizardState
    ) {}

    ngOnInit () {
        
        this.textServices.getText().subscribe(text => {

            this.forward = text.find(element => element.id === 'next')[this.wizardState.language]
            this.back    = text.find(element => element.id === 'back')[this.wizardState.language]
        
        })
        
    }
}