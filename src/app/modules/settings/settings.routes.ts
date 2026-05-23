import { Routes } from '@angular/router';

import { Settings as SettingsComponent } from './components/settings/settings';
import { Email as EmailComponent } from './components/email/email';
import { Security as SecurityComponent } from './components/security/security';
import { Picture as PictureComponent } from './components/picture/picture';
import { Informations as InformationsComponent } from './components/informations/informations';
import { Signature as SignatureComponent } from './components/signature/signature';

import { authGuard } from '../../core/guards/auth/auth-guard';

export const settingsRoutes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'email',
        component: EmailComponent,
        data: { title: 'SETTINGS_PAGE.EMAIL_PAGE.TAB_NAME' },
      },
      {
        path: 'security',
        component: SecurityComponent,
        data: { title: 'SETTINGS_PAGE.SECURITY_PAGE.TAB_NAME' },
      },
      {
        path: 'picture',
        component: PictureComponent,
        data: { title: 'SETTINGS_PAGE.PICTURE_PAGE.TAB_NAME' },
      },
      {
        path: 'informations',
        component: InformationsComponent,
        data: { title: 'SETTINGS_PAGE.INFORMATIONS_PAGE.TAB_NAME' },
      },
      {
        path: 'signature',
        component: SignatureComponent,
        data: { title: 'SETTINGS_PAGE.SIGNATURE_PAGE.TAB_NAME' },
      },
      {
        path: '**',
        redirectTo: 'email',
      },
    ],
  },
];
