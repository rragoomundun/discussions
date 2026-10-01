import { Component, inject, signal, DestroyRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { Observable } from 'rxjs';

import { AppState } from '../../../../shared/store/app.state';
import { selectConfigModel } from '../../../../shared/store/config/config.selectors';
import * as ConfigActions from '../../../../shared/store/config/config.actions';

import { Config } from '../../../../shared/models/Config';

import { Config as ConfigService } from '../../../../shared/services/config/config';

import { Input as InputComponent } from '../../../../shared/components/input/input';

@Component({
  selector: 'app-warnings',
  imports: [TranslateModule, ReactiveFormsModule, InputComponent],
  templateUrl: './warnings.html',
  styleUrl: './warnings.scss',
})
export class Warnings {
  private store = inject(Store<AppState>);
  private destroyRef = inject(DestroyRef);
  private configService = inject(ConfigService);

  config$: Observable<Config | null>;

  onUpdateWarningLimit = signal('false');
  formErrors = signal({ warningLimit: '' });

  formGroup = new FormGroup({
    warningLimit: new FormControl(5, [
      Validators.required,
      Validators.min(5),
    ]),
  });

  constructor() {
    this.config$ = this.store.select(selectConfigModel);

    const configSubscription = this.config$.subscribe(
      (config: Config | null) => {
        if (config) {
          this.formGroup.controls.warningLimit.setValue(config.warningLimit);
        }
      },
    );

    this.destroyRef.onDestroy(() => configSubscription.unsubscribe());
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }

    const limit = <number>this.formGroup.controls.warningLimit.value;

    this.onUpdateWarningLimit.set('true');
    this.formErrors.set({ warningLimit: '' });

    this.configService.updateWarningLimit(limit).subscribe({
      complete: () => {
        this.onUpdateWarningLimit.set('success');
        this.store.dispatch(
          ConfigActions.updateWarningLimitSuccess({ warningLimit: limit }),
        );
      },
      error: (error: HttpErrorResponse) => {
        this.onUpdateWarningLimit.set('error');

        if (error.error?.type === 'INVALID') {
          this.formErrors.set({ warningLimit: 'WARNING_LIMIT_MIN' });
        }
      },
    });
  }
}
