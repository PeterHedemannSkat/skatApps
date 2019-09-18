import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { routing, appRoutingProviders } from "./app.router";

import { InMemoryWebApiModule } from "angular2-in-memory-web-api";
import { InMemoryDataService } from "../data/inMemoryData.service";

import { AppComponent } from "../mainComponent/udbetaltSkattekort.mainComponent";
import {
  tusindtalsSep,
  normalInput,
  bootstrapStyleRadioButton,
  wizardBar,
  selector,
  Validator
} from "../../../shared/shared";
import { WizardState, languageText } from "../infrastructure/wizardressources";
import { getDataService } from "../services/getData.service";
import { globalButtoms } from "./app.globalKnapper";

import { basicIncome } from "../wizardSteps/step1";
import { basicSkattekort } from "../wizardSteps/step2";
import { resultat } from "../wizardSteps/step3_resultat";
import { Aindkomst } from "../components/modal.aindkomst";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule
    //InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  declarations: [
    AppComponent,
    wizardBar,
    basicIncome,
    globalButtoms,
    normalInput,
    basicSkattekort,
    bootstrapStyleRadioButton,
    resultat,
    tusindtalsSep,
    selector,
    Aindkomst
  ],
  providers: [appRoutingProviders, WizardState, getDataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
