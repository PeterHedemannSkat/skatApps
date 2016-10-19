import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';
import { basicIncome } from '../wizardSteps/step1';
import { basicSkattekort } from '../wizardSteps/step2';
import { resultat } from '../wizardSteps/step3_resultat';

const appRoutes: Routes = [

  { path: 'indkomst', component: basicIncome},
  { path: '', redirectTo:'indkomst',pathMatch:'full'},  
  { path: 'skattekort', component: basicSkattekort},
  { path: 'resultat', component: resultat} 
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes,{useHash:true});