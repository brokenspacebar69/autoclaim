import { Component, OnInit } from '@angular/core';
import { FirestoreService, Vehicle } from '../services/firestore.service';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Auth, user } from '@angular/fire/auth';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.page.html',
  styleUrls: ['./vehicles.page.scss'],
  standalone: false
})
export class VehiclesPage implements OnInit {
  vehicles$!: Observable<Vehicle[]>;
  newVehicle: Partial<Vehicle> = {};
  editingVehicle: Vehicle | null = null;
  currentUserUid = '';

  constructor(
    private firestoreService: FirestoreService, 
    private toastCtrl: ToastController,
    private auth: Auth,
  ) {}

  ngOnInit() {
    user(this.auth).subscribe(currentUser => {
      if (currentUser) {
        this.currentUserUid = currentUser.uid;
        this.vehicles$ = this.firestoreService.getVehiclesByOwner(currentUser.uid);
      }
    });
  }

  async addVehicle() {
    if (this.newVehicle.make && this.newVehicle.model && this.newVehicle.plate && this.newVehicle.color) {
      try {
        await this.firestoreService.addVehicle({
          ...(this.newVehicle as Vehicle),
          ownerUid: this.currentUserUid
        });
        this.newVehicle = {};
        this.showToast('Vehicle added!');
      } catch (err: any) {
        this.showToast('Error adding vehicle: ' + err.message, 'danger');
      }
    }
  }
  startEdit(vehicle: Vehicle) {
    this.editingVehicle = { ...vehicle };
  }

  async updateVehicle() {
    if (this.editingVehicle && this.editingVehicle.id) {
      try {
        await this.firestoreService.updateVehicle(this.editingVehicle.id, this.editingVehicle);
        this.editingVehicle = null;
        this.showToast('Vehicle updated!');
      } catch (err: any) {
        this.showToast('Error updating vehicle: ' + err.message, 'danger');
      }
    }
  }
  
  async deleteVehicle(id: string) {
    try {
      await this.firestoreService.deleteVehicle(id);
      this.showToast('Vehicle deleted!');
    } catch (err: any) {
      this.showToast('Error deleting vehicle: ' + err.message, 'danger');
    }
  }

async showToast(message: string, color: string = 'success') {
  const toast = await this.toastCtrl.create({
    message,
    duration: 2000,
    color
  });
  toast.present();
}
}
