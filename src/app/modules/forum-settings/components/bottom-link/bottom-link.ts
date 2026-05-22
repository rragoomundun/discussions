import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-bottom-link',
  imports: [TranslateModule, ReactiveFormsModule],
  templateUrl: './bottom-link.html',
  styleUrl: './bottom-link.scss',
})
export class BottomLink {
  group = input.required<FormGroup>();
  delete = output<void>();
}
