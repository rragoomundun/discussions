import { Component, inject, DestroyRef } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { AppState } from '../../../../shared/store/app.state';
import {
  selectUserModel,
  selectOnUpdatePersonalInformation,
} from '../../../../shared/store/user/user.selectors';
import * as UserActions from '../../../../shared/store/user/user.actions';
import { User } from '../../../../shared/models/User';

import { Input as InputComponent } from '../../../../shared/components/input/input';
import { Select as SelectComponent } from '../../../../shared/components/select/select';
import { TextArea as TextAreaComponent } from '../../../../shared/components/text-area/text-area';

@Component({
  selector: 'app-settings-informations',
  imports: [AsyncPipe, ReactiveFormsModule, TranslateModule, InputComponent, SelectComponent, TextAreaComponent],
  templateUrl: './informations.html',
  styleUrl: './informations.scss',
})
export class Informations {
  private store = inject(Store<AppState>);
  private destroyRef = inject(DestroyRef);

  onUpdatePersonalInformation$: Observable<string>;

  formGroup = new FormGroup({
    location: new FormControl<string>(''),
    gender: new FormControl<string>(''),
    birthday: new FormControl<string>(''),
    biography: new FormControl<string>(''),
  });

  constructor() {
    this.onUpdatePersonalInformation$ = this.store.select(selectOnUpdatePersonalInformation);
    this.store.dispatch(UserActions.initUpdatePersonalInformation());

    const sub = this.store.select(selectUserModel).subscribe((user: User | null | undefined) => {
      if (user) {
        this.formGroup.patchValue({
          location: user.location ?? '',
          gender: user.gender ?? '',
          birthday: user.birthday ?? '',
          biography: user.biography ?? '',
        });
      }
    });

    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }

  onSubmit(): void {
    const { location, gender, birthday, biography } = this.formGroup.value;

    this.store.dispatch(
      UserActions.updatePersonalInformation({
        location: location || null,
        gender: (gender as 'male' | 'female') || null,
        birthday: birthday || null,
        biography: biography || null,
      }),
    );
  }
}
