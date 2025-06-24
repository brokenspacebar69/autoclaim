import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private auth: Auth) {}

  signUp(email: string, password: string): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }
}
