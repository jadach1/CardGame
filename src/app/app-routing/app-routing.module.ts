import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SimulationComponent }  from '../simulation/simulation.component';

const appRoutes: Routes = [
  {path: 'simulation',
   component: SimulationComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot( 
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only 
    )
  ],
  exports: [
    RouterModule 
  ]
})
export class AppRoutingModule { }
