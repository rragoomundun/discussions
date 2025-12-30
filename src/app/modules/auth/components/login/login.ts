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
import { RouterModule } from '@angular/router';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { AppState } from '../../../../shared/store/app.state';
import { selectConfigModel } from '../../../../shared/store/config/config.selectors';
import { Input } from '../../../../shared/components/input/input';

import { Config } from '../../../../shared/models/Config';

import { Auth as AuthService } from '../../services/auth/auth';

@Component({
  selector: 'app-login',
  imports: [
    TranslateModule,
    RouterModule,
    ReactiveFormsModule,
    AsyncPipe,
    Input,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private store = inject(Store<AppState>);
  private authService = inject(AuthService);

  config$: Observable<Config | null>;

  formGroup = signal(
    new FormGroup({
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    }),
  );
  loginError = signal('');
  onLogin = signal('false');

  constructor() {
    this.config$ = this.store.select(selectConfigModel);
  }

  onSubmit(): void {
    const params = {
      name: <string>this.formGroup().controls.name.value,
      password: <string>this.formGroup().controls.password.value,
    };

    this.onLogin.set('true');

    this.authService.login(params).subscribe({
      complete: () => {
        this.onLogin.set('success');
        window.location.href = window.location.origin;
      },
      error: (error: HttpErrorResponse) => {
        const { type } = error.error;

        this.onLogin.set('error');

        if (type) {
          this.loginError.set(`LOGIN_PAGE.ERRORS.${type}`);
        }
      },
    });
  }
}
