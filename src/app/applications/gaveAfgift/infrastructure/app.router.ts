import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';
import { step1 } from '../wizardSteps/step1';
import { step2 } from '../wizardSteps/step2';
import { step3 } from '../wizardSteps/step3';

const appRoutes: Routes = [

  { path: 'trin1', component: step1},
  { path: '', redirectTo:'trin1',pathMatch:'full'},  
  { path: 'trin2', component: step2},
  { path: 'trin3', component: step3} 
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes,{useHash:true});