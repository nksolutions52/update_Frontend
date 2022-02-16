import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PagesComponent } from './pages/pages.component';

const appRoutes: Routes = [
  {
    path: 'pages',
    redirectTo: 'pages/index',
    pathMatch: 'full'
  },
  // {
  //   path: '**',
  //   redirectTo: 'pages/index'
  // }
  {
    path:'',
    component: LoginComponent
  }
];

export const routing = RouterModule.forRoot(appRoutes);
