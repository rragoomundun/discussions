import {
  Component,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Input as InputComponent } from '../../../../shared/components/input/input';
import { TextArea as TextAreaComponent } from '../../../../shared/components/text-area/text-area';

@Component({
  selector: 'app-forum-category-edit',
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    InputComponent,
    TextAreaComponent,
  ],
  templateUrl: './forum-category-edit.html',
  styleUrl: './forum-category-edit.scss',
})
export class ForumCategoryEdit {
  private modalService = inject(NgbModal);

  modalEl = viewChild<ElementRef>('modalEl');

  name = input<string | null>();
  description = input<string | null>();
  metaDescription = input<string | null>();
  onChange = output<{
    name: string;
    description: string;
    metaDescription: string;
  }>();

  categoryForm = signal(
    new FormGroup({
      name: new FormControl<string | null | undefined>(null),
      description: new FormControl<string | null | undefined>(null),
      metaDescription: new FormControl<string | null | undefined>(null),
    }),
  );

  open(): void {
    this.categoryForm().controls.name.setValue(this.name());
    this.categoryForm().controls.description.setValue(this.description());
    this.categoryForm().controls.metaDescription.setValue(
      this.metaDescription(),
    );

    this.modalService.open(this.modalEl());
  }

  onOkClick(): void {
    this.onChange.emit({
      name: String(this.categoryForm().controls.name.value),
      description: String(this.categoryForm().controls.description.value),
      metaDescription: String(
        this.categoryForm().controls.metaDescription.value,
      ),
    });

    this.modalService.dismissAll();
  }
}
