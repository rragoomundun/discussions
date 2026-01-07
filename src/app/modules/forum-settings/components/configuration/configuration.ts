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

  onLogoUpload: string = 'false';
  onLogoDelete: string = 'false';
  onFaviconUpload: string = 'false';
  onFaviconDelete: string = 'false';

  formGroup = signal(
    new FormGroup({
      title: new FormControl('', [Validators.required]),
      lang: new FormControl('', [Validators.required]),
      logo: new FormControl(''),
      favicon: new FormControl(''),
      description: new FormControl(''),
      meta_description: new FormControl(''),
      show_title: new FormControl(true, [Validators.required]),
      show_logo: new FormControl(false, [Validators.required]),
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
          this.formGroup().controls.meta_description.setValue(
            config.meta_description,
          );
          this.formGroup().controls.show_title.setValue(config.show_title);
          this.formGroup().controls.show_logo.setValue(config.show_logo);
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
      meta_description: <string>(
        this.formGroup().controls.meta_description.value
      ),
      show_title: <boolean>this.formGroup().controls.show_title.value,
      show_logo: <boolean>this.formGroup().controls.show_logo.value,
      /*
       * Exists to maintain compatibility with the model,
       * it won't be used in the backend.
       */
      created_at: new Date(),
    };

    this.logo()!.originalFilePath = params.logo;
    this.favicon()!.originalFilePath = params.favicon;

    this.store.dispatch(ConfigActions.updateConfig({ config: params }));
  }

  onSubmit(): void {
    const tasks = [];

    if (this.logo()?.image()) {
      this.onLogoUpload = 'true';

      tasks.push(
        this.fileService.uploadFile(<Blob>this.logo()?.file).pipe(
          tap({
            next: (value) => {
              this.formGroup().controls.logo.setValue(value.path);

              this.onLogoUpload = 'success';
            },
            error: () => (this.onLogoUpload = 'error'),
          }),
        ),
      );
    }

    if (
      this.logo()?.originalFilePath &&
      (this.formGroup().controls.logo.value === '' || this.logo()?.image())
    ) {
      this.onLogoDelete = 'true';

      tasks.push(
        this.fileService
          .deleteFile({ path: <string>this.logo()?.originalFilePath })
          .pipe(
            tap({
              next: () => {
                this.onLogoDelete = 'success';
              },
              error: () => (this.onLogoDelete = 'error'),
            }),
          ),
      );
    }

    if (this.favicon()?.image()) {
      this.onFaviconUpload = 'true';

      tasks.push(
        this.fileService.uploadFile(<Blob>this.favicon()?.file).pipe(
          tap({
            next: (value) => {
              this.formGroup().controls.favicon.setValue(value.path);

              this.onFaviconUpload = 'success';
            },
            error: () => (this.onFaviconUpload = 'error'),
          }),
        ),
      );
    }

    if (
      this.favicon()?.originalFilePath &&
      (this.formGroup().controls.favicon.value === '' ||
        this.favicon()?.image())
    ) {
      this.onFaviconDelete = 'true';

      tasks.push(
        this.fileService
          .deleteFile({ path: <string>this.favicon()?.originalFilePath })
          .pipe(
            tap({
              next: () => (this.onFaviconDelete = 'success'),
              error: () => (this.onFaviconDelete = 'error'),
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
