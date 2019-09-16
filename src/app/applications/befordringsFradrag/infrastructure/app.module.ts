import { NgModule}      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule,JsonpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.router';
import { Jsonp } from '@angular/http'


import { appMain }  from '../components/mainComponent';
import {  tusindtalsSep,
          normalInput,
          bootstrapStyleRadioButton,
          wizardBar,
          selector,
          getJSONdata,
          Validator,
          importJsonData,
          decimalDK,
          DatovaelgerInputFeltComponent,
          readableDigitFormat } from '../../../shared/shared';
import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { InMemoryDataService } from '../data/inMemoryData.service';





@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule, 
    HttpModule,
    JsonpModule
    ,InMemoryWebApiModule.forRoot(InMemoryDataService) 
  ],
  declarations: [
    appMain,
    normalInput,
    bootstrapStyleRadioButton,
    tusindtalsSep,
    decimalDK,
    selector,
    readableDigitFormat,
    DatovaelgerInputFeltComponent
  ],
  providers: [ getJSONdata,importJsonData],
  bootstrap: [ appMain ]
})
export class AppModule { }
