import { Routes } from '@angular/router';

import { Register as RegisterComponent } from './components/register/register';
import { RegisterConfirm as RegisterConfirmComponent } from './components/register-confirm/register-confirm';
import { Login as LoginComponent } from './components/login/login';
import { PasswordForgotten as PasswordForgottenComponent } from './components/password-forgotten/password-forgotten';
import { ResetPassword as ResetPasswordComponent } from './components/reset-password/reset-password';

import { guestGuard } from '../../core/guards/guest/guest-guard';

export const authRoutes: Routes = [
  {
    path: '',
    // canActivate: [guestGuard],
    children: [
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
      {
        path: 'login',
        component: LoginComponent,
        data: { title: 'GENERAL.LOGIN' },
      },
      {
        path: 'password',
        children: [
          {
            path: 'forgotten',
            component: PasswordForgottenComponent,
            data: { title: 'GENERAL.PASSWORD_FORGOTTEN' },
          },
          {
            path: 'reset/:resetPasswordToken',
            component: ResetPasswordComponent,
            data: { title: 'RESET_PASSWORD_PAGE.TITLE' },
          },
        ],
      },
    ],
  },
];
