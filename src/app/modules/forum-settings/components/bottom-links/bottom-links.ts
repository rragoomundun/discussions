import { Component, inject, signal, DestroyRef } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import {
  CdkDrag,
  CdkDropList,
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

import { Observable } from 'rxjs';

import { AppState } from '../../../../shared/store/app.state';
import {
  selectBottomLinks,
  selectOnUpdateBottomLinks,
} from '../../../../shared/store/config/config.selectors';
import * as ConfigActions from '../../../../shared/store/config/config.actions';

import { BottomLink as BottomLinkModel } from '../../../../shared/models/BottomLink';
import { BottomLink as BottomLinkComponent } from '../bottom-link/bottom-link';

@Component({
  selector: 'app-bottom-links',
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    BottomLinkComponent,
    AsyncPipe,
    CdkDropList,
    CdkDrag,
  ],
  templateUrl: './bottom-links.html',
  styleUrl: './bottom-links.scss',
})
export class BottomLinks {
  private store = inject(Store<AppState>);
  private destroyRef = inject(DestroyRef);

  onUpdateBottomLinks$: Observable<string>;

  links = signal<FormGroup[]>([]);

  constructor() {
    this.onUpdateBottomLinks$ = this.store.select(selectOnUpdateBottomLinks);

    this.store.dispatch(ConfigActions.initUpdateBottomLinks());

    const subscription = this.store
      .select(selectBottomLinks)
      .subscribe((bottomLinks: BottomLinkModel[]) => {
        this.links.set(
          bottomLinks.map(
            (bl) =>
              new FormGroup({
                id: new FormControl(bl.id),
                name: new FormControl(bl.name, [Validators.required]),
                link: new FormControl(bl.link, [Validators.required]),
                index: new FormControl(bl.index),
              }),
          ),
        );
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  addLink(): void {
    this.links.update((links) => [
      ...links,
      new FormGroup({
        id: new FormControl(0),
        name: new FormControl('', [Validators.required]),
        link: new FormControl('', [Validators.required]),
        index: new FormControl(links.length),
      }),
    ]);
  }

  removeLink(i: number): void {
    this.links.update((links) => links.filter((_, idx) => idx !== i));
  }

  save(): void {
    const bottomLinks: BottomLinkModel[] = this.links().map((group, i) => {
      const id = group.controls['id'].value as number;
      return {
        ...(id !== 0 && { id }),
        name: group.controls['name'].value as string,
        link: group.controls['link'].value as string,
        index: i,
      };
    });

    this.store.dispatch(ConfigActions.updateBottomLinks({ bottomLinks }));
  }

  drop(event: CdkDragDrop<FormGroup[]>): void {
    this.links.update((links) => {
      const updated = [...links];
      moveItemInArray(updated, event.previousIndex, event.currentIndex);
      return updated;
    });
  }

  isFormValid(): boolean {
    return this.links().every((group) => group.valid);
  }
}
