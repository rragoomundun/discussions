import {
  Component,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { WarningTarget } from '../../models/WarningTarget';

import { Warning as WarningService } from '../../services/warning/warning';

import { TextArea as TextAreaComponent } from '../text-area/text-area';

@Component({
  selector: 'app-give-warning',
  imports: [TranslateModule, ReactiveFormsModule, TextAreaComponent],
  templateUrl: './give-warning.html',
  styleUrl: './give-warning.scss',
})
export class GiveWarning {
  private modalService = inject(NgbModal);
  private warningService = inject(WarningService);

  modalEl = viewChild<ElementRef>('modalEl');

  user = input<WarningTarget>();

  onSend = signal('false');

  formGroup = new FormGroup({
    reason: new FormControl('', [Validators.required]),
  });

  open(): void {
    this.onSend.set('false');
    this.formGroup.reset();

    this.modalService.open(this.modalEl());
  }

  onSendClick(): void {
    if (this.formGroup.invalid) {
      return;
    }

    this.onSend.set('true');

    this.warningService
      .sendWarning(<string>this.formGroup.controls.reason.value, this.user()!.id)
      .subscribe({
        complete: () => this.onSend.set('success'),
        error: () => this.onSend.set('error'),
      });
  }
}
