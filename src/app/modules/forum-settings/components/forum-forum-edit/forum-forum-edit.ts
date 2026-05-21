import {
  Component,
  ElementRef,
  inject,
  viewChild,
  input,
  output,
  signal,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  FormArray,
} from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Input as InputComponent } from '../../../../shared/components/input/input';
import { TextArea as TextAreaComponent } from '../../../../shared/components/text-area/text-area';
import { Select as SelectComponent } from '../../../../shared/components/select/select';

import { Translation as TranslationService } from '../../../../shared/services/translation/translation';

@Component({
  selector: 'app-forum-forum-edit',
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    InputComponent,
    TextAreaComponent,
    SelectComponent,
  ],
  templateUrl: './forum-forum-edit.html',
  styleUrl: './forum-forum-edit.scss',
})
export class ForumForumEdit {
  private modalService = inject(NgbModal);
  private translationService = inject(TranslationService);

  modalEl = viewChild<ElementRef>('modalEl');

  categoryNamesIds =
    input<{ name: string | undefined; id: number | null | undefined }[]>();
  name = input<string | null>(null);
  description = input<string | null>(null);
  metaDescription = input<string | null>(null);
  categoryId = input<number | null>(null);
  categoriesFormArray = input<
    FormArray<
      FormGroup<{
        id: FormControl<number | null>;
        name: FormControl<string>;
        description: FormControl<string>;
        metaDescription: FormControl<string>;
        index: FormControl<number>;
      }>
    >
  >();
  categoryOptions = signal<{ label: string; value: string }[]>([]);
  forumForm = signal(
    new FormGroup({
      name: new FormControl<string | null>(null),
      description: new FormControl<string | null>(null),
      metaDescription: new FormControl<string | null>(null),
      categoryId: new FormControl<number | null>(null),
    }),
  );
  onChange = output<{
    name: string | null;
    description: string | null;
    metaDescription: string | null;
    categoryId: number | null;
  }>();

  initCategoryOptions(): void {
    this.categoryOptions.set(
      this.categoriesFormArray()?.value.map((category) => ({
        label:
          category.name || this.translationService.instant('GENERAL.UNTILTED'),
        value: String(category.id),
      })) || [],
    );
  }

  open(): void {
    this.forumForm().controls.name.setValue(this.name());
    this.forumForm().controls.description.setValue(this.description());
    this.forumForm().controls.metaDescription.setValue(this.metaDescription());
    this.forumForm().controls.categoryId.setValue(this.categoryId());

    this.initCategoryOptions();

    this.modalService.open(this.modalEl());
  }

  onOkClick(): void {
    this.onChange.emit({
      name: this.forumForm()!.controls.name.value,
      description: this.forumForm()!.controls.description.value,
      metaDescription: this.forumForm()!.controls.metaDescription.value,
      categoryId: Number(this.forumForm()!.controls.categoryId.value),
    });

    this.modalService.dismissAll();
  }
}
