import { Component, Input, OnInit } from '@angular/core';
import { WizardState } from '../services/app.wizardState.service';

@Component({
    selector:'global-buttons',
    template:`
        <hr class = "skts-divider">
            <div class = "clearfix skts-wizard-buttons">
            <input *ngIf = "wizardState.trin > 0 && wizardState.trin < links.length-1"  [value] = "content.back" type = "button" class = "btn skts-btn-secondary pull-left" [routerLink] = "links[wizardState.trin - 1]">   
            <input *ngIf = "wizardState.trin < links.length-1"  [value] = "content.next" type = "button" class = "btn btn-primary pull-right" [routerLink] = "links[wizardState.trin +1]" [disabled] = "disable">     
        </div>
    `
})

export class globalButtoms {


    constructor (
        private wizardState: WizardState
    ) {}

    ngOnInit () {



    }


}