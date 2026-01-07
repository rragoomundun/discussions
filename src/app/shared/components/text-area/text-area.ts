import { Component, input } from '@angular/core';
import {
  ControlContainer,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-text-area',
  imports: [ReactiveFormsModule],
  templateUrl: './text-area.html',
  styleUrl: './text-area.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class TextArea {
  id = input<string>();
  label = input<string>();
  labelIcon = input<string>();
  placeholder = input<string>();
  control = input<string>();
  rows = input<number>();
}
