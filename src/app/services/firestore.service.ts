import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Vehicle {
  id?: string;      
  plate: string;
  make: string;
  model: string;
  color: string;
  ownerUid: string;  
}

@Injectable({ providedIn: 'root' })
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  async addUser(user: any) {
    return addDoc(collection(this.firestore, 'users'), user);
  }

  async addSignup(signup: any) {
    return addDoc(collection(this.firestore, 'signups'), signup);
  }

  async addLogin(login: any) {
    return addDoc(collection(this.firestore, 'logins'), login);
  }

  async addVehicle(vehicle: Vehicle) {
    const vehiclesRef = collection(this.firestore, 'vehicles');
    return addDoc(vehiclesRef, vehicle);
  }

  getVehiclesByOwner(ownerUid: string): Observable<Vehicle[]> {
    const vehiclesRef = collection(this.firestore, 'vehicles');
    const q = query(vehiclesRef, where('ownerUid', '==', ownerUid));
    return collectionData(q, { idField: 'id' }) as Observable<Vehicle[]>;
  }

  updateVehicle(id: string, vehicle: Partial<Vehicle>) {
    const vehicleDoc = doc(this.firestore, 'vehicles', id);
    return updateDoc(vehicleDoc, vehicle);
  }

  
  deleteVehicle(id: string) {
    const vehicleDoc = doc(this.firestore, 'vehicles', id);
    return deleteDoc(vehicleDoc);
  }
}
