import { Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { AppState } from '../../../../shared/store/app.state';
import {
  selectConfigConfigExists,
  selectConfigModel,
} from '../../../../shared/store/config/config.selectors';

import { Input } from '../../../../shared/components/input/input';

import { Config } from '../../../../shared/models/Config';

import { Auth as AuthService } from '../../services/auth/auth';

@Component({
  selector: 'app-register',
  imports: [TranslateModule, ReactiveFormsModule, AsyncPipe, Input],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private store = inject(Store<AppState>);
  private authService = inject(AuthService);

  exists$: Observable<{ config: boolean; admin: boolean } | null>;
  config$: Observable<Config | null>;

  formGroup = signal(
    new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      passwordConfirmation: new FormControl('', [Validators.required]),
    }),
  );
  formErrors = signal({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });
  registerError = signal('');
  onRegister = signal('false');

  constructor() {
    this.exists$ = this.store.select(selectConfigConfigExists);
    this.config$ = this.store.select(selectConfigModel);

    this.onRegister.set('false');
  }

  resetFormErrors(): void {
    this.formErrors.set({
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    });
  }

  onSubmit(): void {
    const params = {
      name: <string>this.formGroup().controls.name.value,
      email: <string>this.formGroup().controls.email.value,
      password: <string>this.formGroup().controls.password.value,
      passwordConfirmation: <string>(
        this.formGroup().controls.passwordConfirmation.value
      ),
    };

    this.onRegister.set('true');

    this.authService.register(params).subscribe({
      complete: () => {
        this.onRegister.set('success');
        this.resetFormErrors();
      },
      error: (error: HttpErrorResponse) => {
        const { type } = error.error;

        this.onRegister.set('error');

        if (type) {
          if (type === 'INVALID_PARAMETERS') {
            this.formErrors.set(error.error.error);
            this.registerError.set('');
          } else {
            this.resetFormErrors();
            this.registerError.set(`REGISTER_PAGE.ERRORS.${type}`);
          }
        }
      },
    });
  }
}
