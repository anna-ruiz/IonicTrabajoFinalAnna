import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeccionPage } from './seccion.page';

const routes: Routes = [
  {
    path: '',
    component: SeccionPage,
   /* children: [
      {
        path: '',
        loadChildren: () => import('../seccion/seccion.module').then(m => m.SeccionPageModule)
      }
    ]*/
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeccionPageRoutingModule {}
