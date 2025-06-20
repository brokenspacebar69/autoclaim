import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: false
})
export class SignupPage {
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private firestoreService: FirestoreService
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required] 
    });
  }

  async onSignup() {
    const signupData = {
      email: this.signupForm.value.email,
      name: this.signupForm.value.name,
      role: this.signupForm.value.role,
      password: this.signupForm.value.password, 
      timestamp: new Date()
    };
    console.log('Attempting to sign up:', signupData);
    try {
      await this.firestoreService.addSignupData(signupData);
      await this.showToast('Signup info recorded! ');
      this.navCtrl.navigateRoot('/login');
    } catch (error: any) {
      await this.showToast('Signup failed: ' + error.message);
    }
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }
}
