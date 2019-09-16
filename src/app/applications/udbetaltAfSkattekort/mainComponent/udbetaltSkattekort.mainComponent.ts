import { Component, OnInit } from '@angular/core';
import { WizardState } from '../services/app.wizardState.service';

@Component({
    selector: 'my-app',
    template: `


        <div class = "skts-wizard">
             <wizard-bar [activeTrin] = "wizardState.trin" [steps] = "navBar"></wizard-bar>
             <router-outlet></router-outlet>
             <global-buttons [links] = "links" [disable] = "!wizardState.stepValidationOk"></global-buttons>
        </div>

    `


})

export class AppComponent { 

    links: string[] = ["/indkomst","/skattekort","/resultat"];
    navBar:string[] = [];

    constructor (
        private wizardState: WizardState
    ) {};

    ngOnInit () {

        this.wizardState.language = document.getElementsByTagName('html')[0].getAttribute('lang');


        this.wizardState.getselect('selects','wizardNames').subscribe(steps => {
            this.navBar = steps.map(v => v.text)
        })

        this.wizardState.getText('general','errorMessages').subscribe(el => {

            el.forEach(el => {
                this.wizardState.errorTxt[el.id] = {
                    errorTxt:el[this.wizardState.language],
                    type:el.id
                }    
            })

        })

        this.wizardState.setErrorTxt()

        this.wizardState.createIncome()
        
    }
}