import { Component, input } from '@angular/core';
import {
  ControlContainer,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-select',
  imports: [ReactiveFormsModule],
  templateUrl: './select.html',
  styleUrl: './select.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class Select {
  id = input<string>();
  label = input<string>();
  labelIcon = input<string>();
  data = input<{ value: string; label: string }[]>();
  selected = input<string | null | undefined>();
  control = input<string>();
}
