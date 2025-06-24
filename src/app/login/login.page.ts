import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { NavController, ToastController } from '@ionic/angular';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
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
    private firestoreService: FirestoreService,
    private auth: Auth,
    private authService: AuthService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async onLogin() {
    const { email, password } = this.loginForm.value;
  try {
    const cred = await signInWithEmailAndPassword(this.auth, email, password);

    await this.firestoreService.addUser({
      uid: cred.user.uid,
      email,
      lastLogin: new Date()
    });
    await this.firestoreService.addLogin({
      uid: cred.user.uid,
      email,
      loginTime: new Date()
    });
      this.navCtrl.navigateRoot('/home');
    } catch (error: any) {
      this.showToast('Login failed: ' + error.message);
    }
  }

  showToast(message: string) {
    this.toastCtrl.create({ message, duration: 2000, color: 'danger' }).then(t => t.present());
  }
}
