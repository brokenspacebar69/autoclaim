import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RoleGuard } from './auth/role.guard';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule), canActivate: [RoleGuard] },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'signup', loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule) },
  { path: 'impounds', loadChildren: () => import('./impounds/impounds.module').then(m => m.ImpoundsPageModule), canActivate: [RoleGuard] },
  { path: 'vehicles', loadChildren: () => import('./vehicles/vehicles.module').then(m => m.VehiclesPageModule) },
  { path: 'vehicle-details/:plate', loadChildren: () => import('./vehicle-details/vehicle-details.module').then(m => m.VehicleDetailsPageModule) },
  { path: 'claim-process/:plate', loadChildren: () => import('./claim-process/claim-process.module').then(m => m.ClaimProcessPageModule) },
  { path: 'notifications/:plate', loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsPageModule) },

  {
    path: 'claim-process',
    loadChildren: () => import('./claim-process/claim-process.module').then( m => m.ClaimProcessPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'impounds',
    loadChildren: () => import('./impounds/impounds.module').then( m => m.ImpoundsPageModule)
  },
  {
    path: 'vehicles',
    loadChildren: () => import('./vehicles/vehicles.module').then( m => m.VehiclesPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
