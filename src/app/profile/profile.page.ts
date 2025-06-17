import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false

})
export class ProfilePage {
  user = {
    name: 'Juan Dela Cruz',
    email: 'juan@email.com',
    claimedVehicles: ['XYZ 123', 'ABC 456']
  };
}
