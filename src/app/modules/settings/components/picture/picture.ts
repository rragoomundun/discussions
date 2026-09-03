import {
  Component,
  inject,
  signal,
  DestroyRef,
  viewChild,
  ElementRef,
} from '@angular/core';
import { of, switchMap, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AppState } from '../../../../shared/store/app.state';
import { selectUserModel } from '../../../../shared/store/user/user.selectors';
import * as UserActions from '../../../../shared/store/user/user.actions';
import { User } from '../../../../shared/models/User';
import { File as FileService } from '../../../../shared/services/file/file';
import { User as UserService } from '../../../../shared/services/user/user';
import { environment } from '../../../../../environments/environment';
import { PictureCropModal } from '../picture-crop-modal/picture-crop-modal';

@Component({
  selector: 'app-settings-picture',
  imports: [TranslateModule],
  templateUrl: './picture.html',
  styleUrl: './picture.scss',
})
export class Picture {
  private store = inject(Store<AppState>);
  private modalService = inject(NgbModal);
  private fileService = inject(FileService);
  private userService = inject(UserService);
  private destroyRef = inject(DestroyRef);

  fileInputEl = viewChild<ElementRef>('fileInputEl');

  previewUrl = signal<string | null>(null);
  onApply = signal('false');

  private initialized = false;
  private originalImage: string | null = null;
  private confirmedBlob: Blob | null = null;

  constructor() {
    const sub = this.store
      .select(selectUserModel)
      .subscribe((user: User | null | undefined) => {
        if (!this.initialized && user != null) {
          this.initialized = true;
          this.originalImage = user.image;
          this.previewUrl.set(user.image ? user.image : null);
        }
      });
    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }

  openFileManager(): void {
    this.fileInputEl()?.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const modalRef = this.modalService.open(PictureCropModal, {
      centered: true,
    });
    modalRef.componentInstance.imageChangedEvent = event;

    modalRef.closed.subscribe((blob: Blob | null) => {
      if (blob) {
        this.confirmedBlob = blob;
        this.previewUrl.set(URL.createObjectURL(blob));
      }
    });
  }

  clearImage(): void {
    this.previewUrl.set(null);
    this.confirmedBlob = null;
  }

  apply(): void {
    const originalImage = this.originalImage;
    const confirmedBlob = this.confirmedBlob;
    const shouldDelete =
      originalImage && (this.previewUrl() === null || confirmedBlob !== null);
    const shouldUpload = confirmedBlob !== null;

    if (!shouldDelete && !shouldUpload) return;

    this.onApply.set('true');

    of(null as null)
      .pipe(
        switchMap(() =>
          shouldDelete
            ? this.fileService
                .deleteFile({ fileName: originalImage! })
                .pipe(map(() => null as null))
            : of(null as null),
        ),
        switchMap(() =>
          shouldUpload
            ? this.fileService.uploadFile(confirmedBlob!)
            : of(null as { link: string; key: string } | null),
        ),
        switchMap((uploadResult: { link: string; key: string } | null) => {
          if (uploadResult !== null) {
            return this.userService
              .updateProfilePicture(uploadResult.link)
              .pipe(map(() => uploadResult.link as string | null));
          }
          return this.userService
            .updateProfilePicture(null)
            .pipe(map(() => null as string | null));
        }),
      )
      .subscribe({
        next: (image) => {
          this.store.dispatch(UserActions.updateProfilePicture({ image }));
          this.originalImage = image;
          this.confirmedBlob = null;
          this.onApply.set('success');
        },
        error: () => this.onApply.set('error'),
      });
  }
}
