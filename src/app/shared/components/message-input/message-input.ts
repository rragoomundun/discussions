import {
  Component,
  ElementRef,
  // inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { TextArea as TextAreaComponent } from '../text-area/text-area';
import { MessagePreview as MessagePreviewComponent } from '../message-preview/message-preview';

@Component({
  selector: 'app-message-input',
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    TextAreaComponent,
    MessagePreviewComponent,
  ],
  templateUrl: './message-input.html',
  styleUrl: './message-input.scss',
})
export class MessageInput {
  previewComponent = viewChild<MessagePreviewComponent>(
    MessagePreviewComponent,
  );

  form = signal(
    new FormGroup({
      message: new FormControl<string>('', { nonNullable: true }),
    }),
  );

  isNew = input();
  additionalValidation = input<{ exist: boolean; value: boolean }>({
    exist: false,
    value: false,
  });
  onPost = input();

  post = output<string>();

  onPreviewClick(): void {
    this.previewComponent()?.preview(<string>this.form().get('message')?.value);
  }

  onPostClick(): void {
    this.post.emit(this.form().controls.message.value);
  }
}
