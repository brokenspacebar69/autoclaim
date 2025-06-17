import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClaimProcessPage } from './claim-process.page';

const routes: Routes = [
  {
    path: '',
    component: ClaimProcessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClaimProcessPageRoutingModule {}
