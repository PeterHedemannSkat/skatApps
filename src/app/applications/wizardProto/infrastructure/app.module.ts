import { NgModule}      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.router';


import { appMain }  from '../components/mainComponent';
import { tusindtalsSep,normalInput,bootstrapStyleRadioButton,wizardBar,selector,Validator } from '../../../shared/shared';
import { WizardState,languageText} from '../infrastructure/wizardressources';
import { globalButtoms } from './app.globalKnapper';

import { step1 } from '../wizardSteps/step1';
import { step2 } from '../wizardSteps/step2';
import { step3 } from '../wizardSteps/step3';




@NgModule({
  imports: [ BrowserModule, FormsModule, routing, HttpModule],
  declarations: [ appMain, wizardBar, step1, globalButtoms, normalInput, step2, bootstrapStyleRadioButton, step3, tusindtalsSep,selector ],
  providers: [ appRoutingProviders, WizardState],
  bootstrap: [ appMain ]
})
export class AppModule { }
