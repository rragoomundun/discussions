import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-settings-picture-crop-modal',
  imports: [TranslateModule, ImageCropperComponent],
  templateUrl: './picture-crop-modal.html',
})
export class PictureCropModal {
  private activeModal = inject(NgbActiveModal);

  imageChangedEvent: Event | null = null;

  private pendingBlob: Blob | null = null;

  onImageCropped(event: ImageCroppedEvent): void {
    if (event.blob) {
      this.pendingBlob = event.blob;
    }
  }

  confirm(): void {
    this.activeModal.close(this.pendingBlob);
  }

  cancel(): void {
    this.activeModal.dismiss();
  }
}
