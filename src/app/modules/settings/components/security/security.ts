import { Component, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { User as UserService } from '../../../../shared/services/user/user';

import { Input as InputComponent } from '../../../../shared/components/input/input';

@Component({
  selector: 'app-settings-security',
  imports: [ReactiveFormsModule, TranslateModule, InputComponent],
  templateUrl: './security.html',
  styleUrl: './security.scss',
})
export class Security {
  private userService = inject(UserService);

  formGroup = new FormGroup({
    password: new FormControl('', [Validators.required]),
    passwordConfirmation: new FormControl('', [Validators.required]),
  });

  formErrors = signal({ password: '', passwordConfirmation: '' });
  onUpdatePassword = signal('false');

  onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }

    this.onUpdatePassword.set('true');
    this.formErrors.set({ password: '', passwordConfirmation: '' });

    this.userService
      .updatePassword(
        <string>this.formGroup.controls.password.value,
        <string>this.formGroup.controls.passwordConfirmation.value,
      )
      .subscribe({
        complete: () => {
          this.onUpdatePassword.set('success');
          this.formGroup.reset();
        },
        error: (error: HttpErrorResponse) => {
          this.onUpdatePassword.set('error');

          if (error.error?.type === 'INVALID_PARAMETERS') {
            this.formErrors.set(error.error.error);
          }
        },
      });
  }
}
