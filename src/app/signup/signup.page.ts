import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { NavController, ToastController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';

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
    private authService: AuthService,
    private navCtrl: NavController,
    private auth: Auth,
    private firestoreService: FirestoreService,
    private toastCtrl: ToastController
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      name: ['', Validators.required],    
      role: ['', Validators.required]
    });
  }

  async onSignup() {
      const { email, name, password, role } = this.signupForm.value;
  
      try {
        const cred = await createUserWithEmailAndPassword(this.auth, email, password);
        await this.firestoreService.addUser({
          uid: cred.user.uid,
          email,
          name,
          role,
          timestamp: new Date()
        });
        await this.firestoreService.addSignup({
          uid: cred.user.uid,
          email,
          name,
          role,
          timestamp: new Date()
        });
      this.showToast('Signup successful! Please login.');
      this.navCtrl.navigateRoot('/login');
    } catch (error: any) {
      this.showToast('Signup failed: ' + error.message);
    }
  }

  showToast(message: string) {
    this.toastCtrl.create({ message, duration: 2000, color: 'success' }).then(t => t.present());
  }
}
