import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.page.html',
  styleUrls: ['./vehicle-details.page.scss'],
  standalone: false
})
export class VehicleDetailsPage {
  vehicle: any;

  vehicles = [
    { plate: 'XYZ 123', make: 'Toyota', model: 'Vios', color: 'Red', impoundDate: '2024-06-17', location: 'Manila Impound Lot' },
    { plate: 'ABC 456', make: 'Honda', model: 'Civic', color: 'Blue', impoundDate: '2024-06-15', location: 'QC Impound Lot' }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const plate = this.route.snapshot.paramMap.get('plate');
    this.vehicle = this.vehicles.find(v => v.plate === plate);
  }
}
