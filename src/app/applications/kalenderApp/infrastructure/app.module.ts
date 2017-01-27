import { NgModule}      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { InMemoryDataService } from '../data/inMemoryData.service';

import {virksomhedsKalenderApp} from '../components/virksomhedskalender.main';
import {settingsCalender} from '../components/indstillinger.component';

import { Deadline } from '../services/deadline.service';
import { getJSONdata,CheckboxGroup,CalenderServices }  from '../../../shared/shared';



@NgModule({
  imports: [ 
      BrowserModule,
      FormsModule,
      HttpModule//,
      //,InMemoryWebApiModule.forRoot( InMemoryDataService )
  ],
  declarations: [
      virksomhedsKalenderApp,
      settingsCalender,
      CheckboxGroup
  ],
  providers: [
      getJSONdata,
      CalenderServices,
      Deadline
  ],
  bootstrap: [ virksomhedsKalenderApp ]
})


export class AppModule { }
