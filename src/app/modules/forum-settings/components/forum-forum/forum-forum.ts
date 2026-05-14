import { Component, input, output, viewChild } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-forum-forum',
  imports: [ReactiveFormsModule, TranslateModule],
  templateUrl: './forum-forum.html',
  styleUrl: './forum-forum.scss',
})
export class ForumForum {
  forumForm = input<
    FormGroup<{
      id: FormControl<number | null>;
      index: FormControl<number>;
      name: FormControl<string | null>;
      description: FormControl<string | null>;
      metaDescription: FormControl<string | null>;
    }>
  >();
  onSettings = output<void>();
  onDelete = output<void>();

  get formGroup(): FormGroup<{
    id: FormControl<number | null>;
    index: FormControl<number>;
    name: FormControl<string | null>;
    description: FormControl<string | null>;
    metaDescription: FormControl<string | null>;
  }> {
    return <FormGroup>this.forumForm();
  }

  onSettingsClick(): void {
    this.onSettings.emit();
  }

  onDeleteClick(): void {
    this.onDelete.emit();
  }
}
