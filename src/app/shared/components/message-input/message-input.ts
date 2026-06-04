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
import { Util as UtilService } from '../../services/util/util';

@Component({
  selector: 'app-message-input',
  imports: [ReactiveFormsModule, TranslateModule, TextAreaComponent],
  templateUrl: './message-input.html',
  styleUrl: './message-input.scss',
})
export class MessageInput {
  private modalService = inject(NgbModal);
  private utilService = inject(UtilService);

  previewModal = viewChild<ElementRef>('previewModal');

  form = signal(
    new FormGroup({
      message: new FormControl<string>('', { nonNullable: true }),
    }),
  );

  previewHtml = signal('');
  isNew = input();
  onPost = input();

  post = output<string>();

  onPreview(): void {
    this.previewHtml.set(
      this.utilService.markdownToHTML(this.form().controls.message.value),
    );
    this.modalService.open(this.previewModal(), { size: 'lg' });
  }

  onPostClick(): void {
    this.post.emit(this.form().controls.message.value);
  }
}
