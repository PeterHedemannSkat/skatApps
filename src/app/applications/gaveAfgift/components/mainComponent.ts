import {Component} from '@angular/core';
import {WizardState} from '../services/app.wizardState.service';
import { Http, Response } from '@angular/http';

@Component({

    selector: 'my-app',

    template:`
        <div class = "skts-wizard">
            <h2> Gaveafgift </h2>
            <div class = "row">
                <div class = "col-xs-12">
                    <label for = "giverBeloeb">Giveren giver </label>
                    <div><input [(ngModel)] = "state.beregnService.giverInput" class = "form-control" id = "giverBeloeb" /></div>
                </div>
            </div>
            <div class = "row">
                <div class = "col-xs-12">
                    <label for = "modtagerBeloeb">Modtager får</label>
                    <div><input [(ngModel)] = "state.beregnService.modtagerInput" class = "form-control" id = "modtagerBeloeb" /></div>
                </div>
            </div>

            <!--
            <div *ngFor = "let categori of state.mainCategories() | async">
                ---
                {{categori.da}}
            </div>
            -->


            <!--{{state.mainCategories() | async}}-->
            <div class = "row">
                <div class = "col-xs-12">
                    <input type = "checkbox" [(ngModel)] = "state.beregnService.giverBetalerAfgift"  id = "whopays" /> 
                    <label for = "whopays" >Giver betaler fradrag</label>
                </div>
            </div>
            
            <div class = "row">
                <div class = "col-xs-12">
                    <p>Gaveafgift, der skal betales</p>
                    <p class = "result">{{state.beregnService.gaveafgiftUser()}} kr.</p>
                </div>
            </div>
             <!--<wizard-bar [activeTrin] = "wizardState.trin" [steps] = "navBar"></wizard-bar>-->
             <router-outlet></router-outlet>
             <!--<global-buttons [links] = "links" [disable] = "!wizardState.stepValidationOk"></global-buttons>-->
        </div>
    
    `

})

export class appMain {

    constructor (public state:WizardState) {

    }



}
