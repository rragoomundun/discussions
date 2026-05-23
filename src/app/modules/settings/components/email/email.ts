import { Component, inject, DestroyRef } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { AppState } from '../../../../shared/store/app.state';
import { selectUserModel, selectOnUpdateEmail } from '../../../../shared/store/user/user.selectors';
import * as UserActions from '../../../../shared/store/user/user.actions';

import { User } from '../../../../shared/models/User';

import { Input as InputComponent } from '../../../../shared/components/input/input';

@Component({
  selector: 'app-settings-email',
  imports: [AsyncPipe, ReactiveFormsModule, TranslateModule, InputComponent],
  templateUrl: './email.html',
  styleUrl: './email.scss',
})
export class Email {
  private store = inject(Store<AppState>);
  private destroyRef = inject(DestroyRef);

  onUpdateEmail$: Observable<string>;

  formGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor() {
    this.onUpdateEmail$ = this.store.select(selectOnUpdateEmail);
    this.store.dispatch(UserActions.initUpdateEmail());

    const userSubscription = this.store.select(selectUserModel).subscribe(
      (user: User | null | undefined) => {
        if (user) {
          this.formGroup.controls.email.setValue(user.email);
        }
      },
    );

    this.destroyRef.onDestroy(() => userSubscription.unsubscribe());
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }

    this.store.dispatch(
      UserActions.updateEmail({ email: <string>this.formGroup.controls.email.value }),
    );
  }
}
