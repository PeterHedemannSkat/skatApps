import { NgModule}      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.router';


import { appMain }  from '../components/mainComponent';
import { tusindtalsSep,normalInput,bootstrapStyleRadioButton,wizardBar,selector,Validator } from '../../../shared/shared';
import { WizardState,languageText} from '../infrastructure/wizardressources';
import { globalButtoms } from './app.globalKnapper';
import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { InMemoryDataService } from '../data/inMemoryData.service';

import { step1 } from '../wizardSteps/step1';
import { step2 } from '../wizardSteps/step2';
import { step3 } from '../wizardSteps/step3';



@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule, 
    routing,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService) 
  ],
  declarations: [
    appMain,
    wizardBar,
    globalButtoms,
    normalInput,
    step1,
    step2,
    step3,
    bootstrapStyleRadioButton,
    tusindtalsSep,
    selector
  ],
  providers: [ appRoutingProviders, WizardState],
  bootstrap: [ appMain ]
})
export class AppModule { }
