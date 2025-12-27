import { Routes } from '@angular/router';

import { Register as RegisterComponent } from './components/register/register';

export const authRoutes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
];
