import {
  Component,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TextArea as TextAreaComponent } from '../text-area/text-area';

import * as textUtil from '../../utils/text/text.util';

@Component({
  selector: 'app-message-input',
  imports: [ReactiveFormsModule, TranslateModule, TextAreaComponent],
  templateUrl: './message-input.html',
  styleUrl: './message-input.scss',
})
export class MessageInput {
  private modalService = inject(NgbModal);

  previewModal = viewChild<ElementRef>('previewModal');

  form = signal(
    new FormGroup({
      message: new FormControl<string>('', { nonNullable: true }),
    }),
  );

  previewHtml = signal('');
  isNew = input();
  additionalValidation = input<{ exist: boolean; value: boolean }>({
    exist: false,
    value: false,
  });
  onPost = input();

  post = output<string>();

  onPreview(): void {
    this.previewHtml.set(
      textUtil.markdownToHTML(this.form().controls.message.value),
    );
    this.modalService.open(this.previewModal(), { size: 'lg' });
  }

  onPostClick(): void {
    this.post.emit(this.form().controls.message.value);
  }
}
