import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage {
  searchTerm = '';
  vehicles = [
    { plate: 'XYZ 123', location: 'Manila Impound Lot' },
    { plate: 'ABC 456', location: 'QC Impound Lot' }
  ];

  constructor(private navCtrl: NavController) {}

  goToVehicleDetails(vehicle: any) {
    this.navCtrl.navigateForward(`/vehicle-details/${vehicle.plate}`);
  }
  
  get filteredVehicles() {
    if (!this.searchTerm) {
      return this.vehicles;
    }
    return this.vehicles.filter(v =>
      v.plate.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  
}
