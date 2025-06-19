import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({ providedIn: 'root' })
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  async addSignupData(signupData: any) {
    return this.firestore.collection('signups').add(signupData);
  }

  async addLoginData(data: any) {
    return this.firestore.collection('logins').add(data);
  }
}
