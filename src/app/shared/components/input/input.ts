import { Component, input } from '@angular/core';
import {
  ControlContainer,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-input',
  imports: [TranslateModule, ReactiveFormsModule],
  templateUrl: './input.html',
  styleUrl: './input.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class Input {
  id = input<string>();
  label = input<string>();
  labelIcon = input<string>();
  placeholder = input<string>();
  prependIcon = input<string>();
  type = input<string>();
  min = input<number>();
  max = input<number>();
  control = input<string>();
  error = input<string>();
  haveErrorBorder = input<boolean>();
}
