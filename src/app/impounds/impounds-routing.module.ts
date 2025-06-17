import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImpoundsPage } from './impounds.page';

const routes: Routes = [
  {
    path: '',
    component: ImpoundsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImpoundsPageRoutingModule {}
