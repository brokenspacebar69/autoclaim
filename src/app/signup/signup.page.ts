import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { Auth, createUserWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: false 
})
export class SignupPage {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private auth: Auth,
    private firestore: Firestore
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  async onSignup() {
    const { email, password, role } = this.signupForm.value;
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      // Save extra user info (role) to Firestore
      await setDoc(doc(this.firestore, 'users', userCredential.user.uid), {
        email,
        role
      });
      this.showToast('Signup successful! Please login.');
      this.navCtrl.navigateRoot('/login');
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
