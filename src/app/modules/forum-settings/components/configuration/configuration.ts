import {
  Component,
  inject,
  signal,
  DestroyRef,
  viewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { Observable, forkJoin, tap } from 'rxjs';

import { AppState } from '../../../../shared/store/app.state';

import {
  selectConfigModel,
  selectOnUpdateConfig,
} from '../../../../shared/store/config/config.selectors';
import * as ConfigActions from '../../../../shared/store/config/config.actions';

import { Config } from '../../../../shared/models/Config';

import { Input as InputComponent } from '../../../../shared/components/input/input';
import { Select as SelectComponent } from '../../../../shared/components/select/select';
import { ImageInput as ImageInputComponent } from '../../../../shared/components/image-input/image-input';
import { TextArea as TextAreaComponent } from '../../../../shared/components/text-area/text-area';
import { Checkbox as CheckboxComponent } from '../../../../shared/components/checkbox/checkbox';

import { File as FileService } from '../../../../shared/services/file/file';

@Component({
  selector: 'app-configuration',
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    InputComponent,
    SelectComponent,
    ImageInputComponent,
    TextAreaComponent,
    CheckboxComponent,
    AsyncPipe,
  ],
  templateUrl: './configuration.html',
  styleUrl: './configuration.scss',
})
export class Configuration {
  private store = inject(Store<AppState>);
  private destroyRef = inject(DestroyRef);
  private fileService = inject(FileService);

  logo = viewChild<ImageInputComponent>('logo');
  favicon = viewChild<ImageInputComponent>('favicon');

  config$: Observable<Config | null>;
  onUpdateConfig$: Observable<string>;

  onLogoUpload = signal('false');
  onLogoDelete = signal('false');
  onFaviconUpload = signal('false');
  onFaviconDelete = signal('false');

  formGroup = signal(
    new FormGroup({
      title: new FormControl('', [Validators.required]),
      lang: new FormControl('', [Validators.required]),
      logo: new FormControl(''),
      favicon: new FormControl(''),
      description: new FormControl(''),
      metaDescription: new FormControl(''),
      showTitle: new FormControl(true, [Validators.required]),
      showLogo: new FormControl(false, [Validators.required]),
    }),
  );

  constructor() {
    this.config$ = this.store.select(selectConfigModel);
    this.onUpdateConfig$ = this.store.select(selectOnUpdateConfig);

    this.store.dispatch(ConfigActions.initUpdateConfig());

    const configSubscription = this.config$.subscribe(
      (config: Config | null) => {
        if (config) {
          this.formGroup().controls.title.setValue(config.title);
          this.formGroup().controls.lang.setValue(config.lang);
          this.formGroup().controls.logo.setValue(config.logo);
          this.formGroup().controls.favicon.setValue(config.favicon);
          this.formGroup().controls.description.setValue(config.description);
          this.formGroup().controls.metaDescription.setValue(
            config.metaDescription,
          );
          this.formGroup().controls.showTitle.setValue(config.showTitle);
          this.formGroup().controls.showLogo.setValue(config.showLogo);
        }
      },
    );

    this.destroyRef.onDestroy(() => configSubscription.unsubscribe());
  }

  updateConfig(): void {
    const params = {
      title: <string>this.formGroup().controls.title.value,
      lang: <string>this.formGroup().controls.lang.value,
      logo: <string>this.formGroup().controls.logo.value,
      favicon: <string>this.formGroup().controls.favicon.value,
      description: <string>this.formGroup().controls.description.value,
      metaDescription: <string>this.formGroup().controls.metaDescription.value,
      showTitle: <boolean>this.formGroup().controls.showTitle.value,
      showLogo: <boolean>this.formGroup().controls.showLogo.value,
      /*
       * Exists to maintain compatibility with the model,
       * it won't be used in the backend.
       */
      createdAt: new Date(),
    };

    this.logo()!.originalFilePath = params.logo;
    this.favicon()!.originalFilePath = params.favicon;

    this.store.dispatch(ConfigActions.updateConfig({ config: params }));
  }

  onSubmit(): void {
    const tasks = [];

    if (this.logo()?.image()) {
      this.onLogoUpload.set('true');

      tasks.push(
        this.fileService.uploadFile(<Blob>this.logo()?.file, 'forum').pipe(
          tap({
            next: (value) => {
              this.formGroup().controls.logo.setValue(value.link);

              this.onLogoUpload.set('success');
            },
            error: () => this.onLogoUpload.set('error'),
          }),
        ),
      );
    }

    if (
      this.logo()?.originalFilePath &&
      (this.formGroup().controls.logo.value === '' || this.logo()?.image())
    ) {
      this.onLogoDelete.set('true');

      tasks.push(
        this.fileService
          .deleteFile({ fileName: <string>this.logo()?.originalFilePath })
          .pipe(
            tap({
              next: () => {
                this.onLogoDelete.set('success');
              },
              error: () => this.onLogoDelete.set('error'),
            }),
          ),
      );
    }

    if (this.favicon()?.image()) {
      this.onFaviconUpload.set('true');

      tasks.push(
        this.fileService.uploadFile(<Blob>this.favicon()?.file, 'forum').pipe(
          tap({
            next: (value) => {
              this.formGroup().controls.favicon.setValue(value.link);

              this.onFaviconUpload.set('success');
            },
            error: () => this.onFaviconUpload.set('error'),
          }),
        ),
      );
    }

    if (
      this.favicon()?.originalFilePath &&
      (this.formGroup().controls.favicon.value === '' ||
        this.favicon()?.image())
    ) {
      this.onFaviconDelete.set('true');

      tasks.push(
        this.fileService
          .deleteFile({ fileName: <string>this.favicon()?.originalFilePath })
          .pipe(
            tap({
              next: () => this.onFaviconDelete.set('success'),
              error: () => this.onFaviconDelete.set('error'),
            }),
          ),
      );
    }

    if (tasks.length) {
      forkJoin(tasks).subscribe({
        next: () => this.updateConfig(),
      });
    } else {
      this.updateConfig();
    }
  }
}
