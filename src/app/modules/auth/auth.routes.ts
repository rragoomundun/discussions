import { Routes } from '@angular/router';

import { Register as RegisterComponent } from './components/register/register';
import { RegisterConfirm as RegisterConfirmComponent } from './components/register-confirm/register-confirm';

export const authRoutes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'GENERAL.REGISTER' },
  },
  {
    path: 'register/confirm/:confirmationToken',
    component: RegisterConfirmComponent,
    data: { title: 'REGISTER_CONFIRM_PAGE.TITLE' },
  },
];
