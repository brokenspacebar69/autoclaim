import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClaimProcessPageRoutingModule } from './claim-process-routing.module';

import { ClaimProcessPage } from './claim-process.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClaimProcessPageRoutingModule
  ],
  declarations: [ClaimProcessPage]
})
export class ClaimProcessPageModule {}
