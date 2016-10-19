import { Component, OnInit } from '@angular/core';
import { skattekortText } from '../services/skattekort.text';
import { languageText } from '../../../shared/interfaces/interfaceslanguage';
import { WizardState } from '../services/app.wizardState.service';

@Component({
    selector: 'my-app',
    template: `

        <div class = "skts-wizard">
             <wizard-bar [activeTrin] = "wizardState.trin" [steps] = "navBar"></wizard-bar>
             <router-outlet></router-outlet>
             <global-buttons [links] = "links"></global-buttons>
        </div>

    `

})

export class AppComponent { 

    links: string[] = ["/indkomst","/skattekort","/resultat"];
    navBar:languageText[] = [];

    constructor (
        private textService: skattekortText,
        private wizardState: WizardState
        ) {};

    ngOnInit () {

        this.wizardState.language = document.getElementsByTagName('html')[0].getAttribute('lang');

        this.textService.getText().subscribe(text => {
            
            this.navBar = text
                .filter(element =>  element.group === 'wizard-step')
                .map(el => el[this.wizardState.language])

        })
    }
}