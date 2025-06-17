import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImpoundsPageRoutingModule } from './impounds-routing.module';

import { ImpoundsPage } from './impounds.page';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoogleMapsModule,
    ImpoundsPageRoutingModule
  ],
  declarations: [ImpoundsPage]
})
export class ImpoundsPageModule {}
