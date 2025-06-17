import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

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
    private auth: Auth,
    private firestore: Firestore
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async onLogin() {
    const { email, password } = this.loginForm.value;
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      // Fetch role from Firestore
      const userDoc = await getDoc(doc(this.firestore, 'users', userCredential.user.uid));
      const userData = userDoc.data();
      if (userData) {
        // Store user info as needed (session/local storage/etc)
        localStorage.setItem('currentUser', JSON.stringify(userData));
        // Redirect based on role
        if (userData['role'] === 'owner') {
          this.navCtrl.navigateRoot('/home');
        } else if (userData['role'] === 'authority') {
          this.navCtrl.navigateRoot('/impounds');
        } else {
          this.showToast('Unknown role');
        }        
      } else {
        this.showToast('User role not found!');
      }
    } catch (error: any) {
      this.showToast(error.message);
    }
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }
}
