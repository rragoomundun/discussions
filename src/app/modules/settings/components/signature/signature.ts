import { Component, inject, DestroyRef } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { AppState } from '../../../../shared/store/app.state';
import {
  selectUserModel,
  selectOnUpdateSignature,
} from '../../../../shared/store/user/user.selectors';
import * as UserActions from '../../../../shared/store/user/user.actions';
import { User } from '../../../../shared/models/User';

import { TextArea as TextAreaComponent } from '../../../../shared/components/text-area/text-area';

@Component({
  selector: 'app-settings-signature',
  imports: [AsyncPipe, ReactiveFormsModule, TranslateModule, TextAreaComponent],
  templateUrl: './signature.html',
  styleUrl: './signature.scss',
})
export class Signature {
  private store = inject(Store<AppState>);
  private destroyRef = inject(DestroyRef);

  onUpdateSignature$: Observable<string>;

  formGroup = new FormGroup({
    signature: new FormControl<string>(''),
  });

  constructor() {
    this.onUpdateSignature$ = this.store.select(selectOnUpdateSignature);
    this.store.dispatch(UserActions.initUpdateSignature());

    const sub = this.store.select(selectUserModel).subscribe((user: User | null | undefined) => {
      if (user) {
        this.formGroup.patchValue({
          signature: user.signature ?? '',
        });
      }
    });

    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }

  onSubmit(): void {
    const { signature } = this.formGroup.value;

    this.store.dispatch(
      UserActions.updateSignature({
        signature: signature || null,
      }),
    );
  }
}
