import {
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as textUtil from '../../utils/text/text.util';

@Component({
  selector: 'app-message-preview',
  imports: [TranslateModule],
  templateUrl: './message-preview.html',
  styleUrl: './message-preview.scss',
})
export class MessagePreview {
  private modalService = inject(NgbModal);

  previewModal = viewChild<ElementRef>('previewModal');

  previewHTML = signal('');

  preview(text: string): void {
    this.previewHTML.set(textUtil.markdownToHTML(text));
    this.modalService.open(this.previewModal(), { size: 'lg' });
  }
}
