import { Component, inject, input, OnInit, signal } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { App as AppService } from '../../services/app/app';

@Component({
  selector: 'app-image-input',
  imports: [ReactiveFormsModule, TranslateModule],
  templateUrl: './image-input.html',
  styleUrl: './image-input.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class ImageInput implements OnInit {
  appService = inject(AppService);

  id = input<string>();
  label = input<string>();
  control = input<FormControl>();

  originalFilePath: string = '';
  file: Blob | null = null;
  image = signal<string | ArrayBuffer | Blob | null | undefined>(null);

  ngOnInit(): void {
    this.originalFilePath = this.control()?.value;
  }

  onFileSelected(event: any) {
    const fileReader = new FileReader();

    fileReader.onload = (e) => this.image.set(e.target?.result);

    this.file = event.target.files[0];
    fileReader.readAsDataURL(event.target.files[0]);
  }

  onDeleteClick(): void {
    this.control()?.setValue('');

    this.file = null;
    this.image.set(null);
  }
}
