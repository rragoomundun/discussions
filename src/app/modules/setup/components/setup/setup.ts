import { Component, inject, signal, DestroyRef } from '@angular/core';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
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
  selectOnInit,
} from '../../../../shared/store/config/config.selectors';
import * as ConfigActions from '../../../../shared/store/config/config.actions';

import { Input as InputComponent } from '../../../../shared/components/input/input';
import { Select as SelectComponent } from '../../../../shared/components/select/select';

@Component({
  selector: 'app-setup',
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    AsyncPipe,
    InputComponent,
    SelectComponent,
  ],
  templateUrl: './setup.html',
  styleUrl: './setup.scss',
})
export class Setup {
  private store = inject(Store<AppState>);

  onInit$: Observable<string>;

  config$: Observable<{ config: boolean; admin: boolean } | null>;

  formGroup = signal(
    new FormGroup({
      title: new FormControl('', [Validators.required]),
      lang: new FormControl('en'),
    }),
  );

  constructor() {
    this.onInit$ = this.store.select(selectOnInit);
    this.config$ = this.store.select(selectConfigConfigExists);
  }

  onSubmit(): void {
    const data = {
      title: <string>this.formGroup().value.title,
      lang: <string>this.formGroup().value.lang,
    };

    this.store.dispatch(ConfigActions.init(data));
  }
}
