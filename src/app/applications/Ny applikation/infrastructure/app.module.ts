import { NgModule}      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.router';

import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { InMemoryDataService } from '../data/inMemoryData.service';

import { AppComponent }  from '../mainComponent/udbetaltSkattekort.mainComponent';
import { tusindtalsSep,normalInput,bootstrapStyleRadioButton,wizardBar } from '../../../shared/shared';
import { skattekortText,WizardState,languageText} from '../infrastructure/wizardressources';
import { Calculation } from '../services/app.calculations.service';
import { globalButtoms } from './app.globalKnapper';


import { basicIncome } from '../wizardSteps/step1';
import { basicSkattekort } from '../wizardSteps/step2';
import { resultat } from '../wizardSteps/step3_resultat';


@NgModule({
  imports: [ BrowserModule, FormsModule, routing, HttpModule, InMemoryWebApiModule.forRoot( InMemoryDataService )],
  declarations: [ AppComponent, wizardBar, basicIncome, globalButtoms, normalInput, basicSkattekort, bootstrapStyleRadioButton, resultat, tusindtalsSep],
  providers: [ appRoutingProviders, skattekortText, Calculation, WizardState ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
