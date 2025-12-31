import { Component, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { Input as InputComponent } from '../../../../shared/components/input/input';

import { Auth as AuthService } from '../../../../shared/services/auth/auth';

@Component({
  selector: 'app-password-forgotten',
  imports: [TranslateModule, ReactiveFormsModule, InputComponent],
  templateUrl: './password-forgotten.html',
  styleUrl: './password-forgotten.scss',
})
export class PasswordForgotten {
  private authService = inject(AuthService);

  formGroup = signal(
    new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    }),
  );

  formErrors = signal({
    email: '',
  });
  passwordForgottenError = signal('');

  onForget = signal('false');

  onSubmit(): void {
    const params = {
      email: <string>this.formGroup().get('email')?.value,
    };

    this.onForget.set('true');

    this.authService.passwordForgotten(params).subscribe({
      complete: () => {
        this.onForget.set('success');
        this.formErrors.set({ email: '' });
        this.passwordForgottenError.set('');
      },
      error: (error: HttpErrorResponse) => {
        const { type } = error.error;

        this.onForget.set('error');

        if (type) {
          if (type === 'INVALID_PARAMETERS') {
            this.formErrors.set(error.error.error);
            this.passwordForgottenError.set('');
          } else {
            this.formErrors.set({ email: '' });
            this.passwordForgottenError.set(
              `PASSWORD_FORGOTTEN_PAGE.ERRORS.${type}`,
            );
          }
        }
      },
    });
  }
}
