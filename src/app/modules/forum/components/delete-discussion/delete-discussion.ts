import {
  Component,
  output,
  inject,
  viewChild,
  ElementRef,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-discussion',
  imports: [TranslateModule],
  templateUrl: './delete-discussion.html',
  styleUrl: './delete-discussion.scss',
})
export class DeleteDiscussion {
  private modalService = inject(NgbModal);
  modalEl = viewChild<ElementRef>('modalEl');

  confirmation = output<void>();

  open(): void {
    this.modalService.open(this.modalEl());
  }

  onYesClick(): void {
    this.confirmation.emit();
    this.modalService.dismissAll();
  }
}
