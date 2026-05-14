import { Component, input, output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-forum-category',
  imports: [ReactiveFormsModule, TranslateModule, DragDropModule],
  templateUrl: './forum-category.html',
  styleUrl: './forum-category.scss',
})
export class ForumCategory {
  categoryFormGroup = input<
    FormGroup<{
      id: FormControl<number | null>;
      name: FormControl<string>;
      metaDescription: FormControl<string>;
      index: FormControl<number>;
    }>
  >();
  selected = input<boolean>(false);
  onSettings = output<void>();
  onDelete = output<void>();

  get formGroup(): FormGroup<{
    id: FormControl<number | null>;
    name: FormControl<string>;
    metaDescription: FormControl<string>;
    index: FormControl<number>;
  }> {
    return <FormGroup>this.categoryFormGroup();
  }

  onSettingsClick(): void {
    this.onSettings.emit();
  }

  onDeleteClick(): void {
    this.onDelete.emit();
  }
}
