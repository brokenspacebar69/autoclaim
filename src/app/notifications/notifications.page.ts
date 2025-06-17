import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone: false

})
export class NotificationsPage implements OnInit {

  notifications = [
    { title: 'Vehicle Impounded', description: 'Your vehicle has been impounded.' },
    { title: 'Appointment Scheduled', description: 'Your appointment has been scheduled.' },
    { title: 'Upcoming Auction', description: 'An auction is scheduled for your vehicle.' },
  ];
  
  
  constructor() { }

  ngOnInit(): void {
    // Initialization logic here
  }
}
