import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, TranslateModule, InputComponent],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPassword {
  private activatedRoute = inject(ActivatedRoute);
  private authService = inject(AuthService);

  formGroup = signal(
    new FormGroup({
      password: new FormControl('', [Validators.required]),
      passwordConfirmation: new FormControl('', [Validators.required]),
    }),
  );
  formErrors = signal({
    password: '',
    passwordConfirmation: '',
  });
  resetPasswordError = signal('');
  onReset = signal('false');

  resetFormErrors(): void {
    this.formErrors.set({
      password: '',
      passwordConfirmation: '',
    });
  }

  onSubmit(): void {
    const { resetPasswordToken } = this.activatedRoute.snapshot.params;
    const params = {
      password: <string>this.formGroup().controls.password?.value,
      passwordConfirmation: <string>(
        this.formGroup().controls.passwordConfirmation?.value
      ),
    };

    this.onReset.set('true');

    this.authService.resetPassword(resetPasswordToken, params).subscribe({
      complete: () => {
        this.onReset.set('success');
        this.resetFormErrors();
        this.resetPasswordError.set('');

        setTimeout(() => (window.location.href = window.location.origin), 3000);
      },
      error: (error: HttpErrorResponse) => {
        const { type } = error.error;

        this.onReset.set('error');

        if (type) {
          if (type === 'INVALID_PARAMETERS') {
            this.formErrors.set(error.error.error);
            this.resetPasswordError.set('');
          } else {
            this.resetFormErrors();
            this.resetPasswordError.set(`RESET_PASSWORD_PAGE.ERRORS.${type}`);
          }
        }
      },
    });
  }
}
