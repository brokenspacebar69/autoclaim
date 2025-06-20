import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private firestoreService: FirestoreService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async onLogin() {
    const loginData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password, 
      timestamp: new Date()
    };

    try {
      await this.firestoreService.addLoginData(loginData);
      await this.showToast('Login info recorded!');
      
      this.navCtrl.navigateRoot('/home');
    } catch (error: any) {
      await this.showToast('Login failed: ' + error.message);
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
