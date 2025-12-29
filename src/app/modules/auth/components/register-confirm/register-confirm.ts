import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { App as AppService } from '../../../../shared/services/app/app';
import { Auth as AuthService } from '../../services/auth/auth';

@Component({
  selector: 'app-register-confirm',
  imports: [TranslateModule],
  templateUrl: './register-confirm.html',
  styleUrl: './register-confirm.scss',
})
export class RegisterConfirm {
  private activatedRoute = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private appService = inject(AppService);

  onRegisterConfirm = signal('true');

  ngOnInit(): void {
    if (this.appService.platform() === 'browser') {
      const { confirmationToken } = this.activatedRoute.snapshot.params;

      this.authService.registerConfirm(confirmationToken).subscribe({
        complete: () => {
          this.onRegisterConfirm.set('success');

          setTimeout(() => {
            window.location.href = window.location.origin;
          }, 3000);
        },
        error: () => this.onRegisterConfirm.set('error'),
      });
    }
  }
}
