import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    // Example: Only allow owners to view /home, authorities to view /impounds
    if (this.router.url.startsWith('/home') && user.role !== 'owner') {
      this.router.navigate(['/impounds']);
      return false;
    }
    if (this.router.url.startsWith('/impounds') && user.role !== 'authority') {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
