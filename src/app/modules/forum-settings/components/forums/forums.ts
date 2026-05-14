import { Component, computed, inject, signal, viewChild } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import {
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

import { ForumCategory as ForumCategoryComponent } from '../forum-category/forum-category';
import { ForumForum as ForumForumComponent } from '../forum-forum/forum-forum';
import { ForumForumEdit as ForumForumEditComponent } from '../forum-forum-edit/forum-forum-edit';
import { ForumCategoryEdit as ForumCategoryEditComponent } from '../forum-category-edit/forum-category-edit';

import { Forum as ForumService } from '../../../../shared/services/forum/forum';

import { Category } from '../../../../shared/models/Category';

@Component({
  selector: 'app-forums',
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    DragDropModule,
    ForumCategoryComponent,
    ForumForumComponent,
    ForumForumEditComponent,
    ForumCategoryEditComponent,
  ],
  templateUrl: './forums.html',
  styleUrl: './forums.scss',
})
export class Forums {
  private forumService = inject(ForumService);

  forumCategoryEditComponent = viewChild<ForumCategoryEditComponent>(
    ForumCategoryEditComponent,
  );
  forumForumEditComponent = viewChild<ForumForumEditComponent>(
    ForumForumEditComponent,
  );

  categoriesFormArray = signal<
    FormArray<
      FormGroup<{
        id: FormControl<number | null>;
        name: FormControl<string>;
        metaDescription: FormControl<string>;
        index: FormControl<number>;
      }>
    >
  >(
    new FormArray<
      FormGroup<{
        id: FormControl<number | null>;
        name: FormControl<string>;
        metaDescription: FormControl<string>;
        index: FormControl<number>;
      }>
    >([]),
  );
  forumsArrayFormArray = signal<
    FormArray<
      FormGroup<{
        id: FormControl<number | null>;
        index: FormControl<number>;
        name: FormControl<string | null>;
        description: FormControl<string | null>;
        metaDescription: FormControl<string | null>;
      }>
    >[]
  >([]);
  selectedCategoryIndex = signal<number | null>(null);
  selectedCategoryId = computed(() => {
    if (this.selectedCategoryIndex() === null) {
      return null;
    }

    return this.categoriesFormArray().at(this.selectedCategoryIndex()!).controls
      .id.value;
  });
  selectedCategoryForm = computed(() => {
    if (this.selectedCategoryIndex() === null) {
      return null;
    }

    return this.categoriesFormArray().at(this.selectedCategoryIndex()!);
  });
  selectedForumForm = signal<FormGroup<{
    id: FormControl<number | null>;
    index: FormControl<number>;
    name: FormControl<string | null>;
    description: FormControl<string | null>;
    metaDescription: FormControl<string | null>;
  }> | null>(null);
  onGetForums = signal('false');
  onUpdateForum = signal('false');

  get isForumsValid(): boolean {
    for (const index in this.forumsArrayFormArray()) {
      if (this.forumsArrayFormArray()[index].invalid) {
        return false;
      }
    }

    return true;
  }

  constructor() {
    this.onGetForums.set('true');

    this.forumService.getForums().subscribe({
      next: (categories: Category[]) => {
        for (const category of categories) {
          this.createCategory(
            Number(category.id),
            category.index,
            category.name,
            category.metaDescription,
          );

          for (const forum of category.forums) {
            this.createForum(
              Number(category.id),
              Number(forum.id),
              forum.index,
              {
                name: forum.name,
                description: forum.description,
                metaDescription: forum.metaDescription,
              },
            );
          }
        }

        if (this.categoriesFormArray().length) {
          this.selectedCategoryIndex.set(0);
        }

        this.onGetForums.set('success');
      },
    });
  }

  getNewId(values: any[]): number {
    if (values === undefined) {
      return -1;
    }

    const ids = <number[]>values.map((category) => category.id);
    const minId = Math.min(...ids);

    if (minId > 0) {
      return -1;
    }

    return minId - 1;
  }

  setCategoriesIndex(): void {
    for (let i = 0; i < this.categoriesFormArray().length; i++) {
      this.categoriesFormArray().at(i).controls.index.setValue(i);
    }
  }

  setForumsIndex(categoryIndex: number): void {
    for (
      let i = 0;
      i < this.forumsArrayFormArray()[categoryIndex].length;
      i++
    ) {
      this.forumsArrayFormArray()
        [categoryIndex].at(i)
        .controls.index.setValue(i);
    }
  }

  initForumsFormArray(categoryId: number): void {
    this.forumsArrayFormArray()[categoryId] = new FormArray<
      FormGroup<{
        id: FormControl<number | null>;
        index: FormControl<number>;
        name: FormControl<string | null>;
        description: FormControl<string | null>;
        metaDescription: FormControl<string | null>;
      }>
    >([]);
  }

  createCategory(
    id: number | null,
    index: number,
    name: string,
    metaDescription: string,
  ): void {
    this.categoriesFormArray().push(
      new FormGroup<{
        id: FormControl<number | null>;
        name: FormControl<string>;
        metaDescription: FormControl<string>;
        index: FormControl<number>;
      }>({
        id: new FormControl<number | null>(id),
        name: new FormControl<string>(name, {
          nonNullable: true,
          validators: [Validators.required],
        }),
        metaDescription: new FormControl<string>(metaDescription, {
          nonNullable: true,
        }),
        index: new FormControl<number>(index, { nonNullable: true }),
      }),
    );
  }

  createForum(
    categoryId: number,
    id: number | null,
    index: number,
    infos: { name: string; description: string; metaDescription: string },
  ): void {
    if (this.forumsArrayFormArray()[categoryId] === undefined) {
      this.initForumsFormArray(categoryId);
    }

    this.forumsArrayFormArray()[categoryId].push(
      new FormGroup<{
        id: FormControl<number | null>;
        index: FormControl<number>;
        name: FormControl<string | null>;
        description: FormControl<string | null>;
        metaDescription: FormControl<string | null>;
      }>({
        id: new FormControl<number | null>(id),
        index: new FormControl<number>(index, { nonNullable: true }),
        name: new FormControl<string | null>(infos.name, {
          nonNullable: true,
          validators: [Validators.required],
        }),
        description: new FormControl<string | null>(infos.description, {
          nonNullable: true,
        }),
        metaDescription: new FormControl<string | null>(
          infos.metaDescription,
          { nonNullable: true },
        ),
      }),
    );
  }

  onCategoryClick(categoryIndex: number, event: any): void {
    if (event.target.className === 'fas fa-times') {
      return;
    }

    this.selectedCategoryIndex.set(categoryIndex);
  }

  onAddCategoryClick(): void {
    this.createCategory(
      this.getNewId(this.categoriesFormArray().value),
      this.categoriesFormArray().length,
      '',
      '',
    );
  }

  onCategorySettingsClick(): void {
    setTimeout(() => {
      this.forumCategoryEditComponent()?.open();
    });
  }

  onCategorySettingsChange(event: {
    name: string | null;
    metaDescription: string | null;
  }): void {
    this.selectedCategoryForm()!.controls.name.setValue(String(event.name));
    this.selectedCategoryForm()!.controls.metaDescription.setValue(
      String(event.metaDescription),
    );
  }

  onDeleteCategory(categoryIndex: number): void {
    if (this.selectedCategoryIndex() === categoryIndex) {
      this.selectedCategoryIndex.set(null);
    }

    this.categoriesFormArray().removeAt(categoryIndex);
    this.setCategoriesIndex();
  }

  onCategoryDropped(event: CdkDragDrop<any>) {
    if (event.previousIndex !== event.currentIndex) {
      const formArray = this.categoriesFormArray();

      moveItemInArray(
        formArray.controls,
        event.previousIndex,
        event.currentIndex,
      );

      this.selectedCategoryIndex.set(event.currentIndex);

      this.setCategoriesIndex();
    }
  }

  onAddForumClick(): void {
    if (this.forumsArrayFormArray()[this.selectedCategoryId()!] === undefined) {
      this.initForumsFormArray(this.selectedCategoryId()!);
    }

    this.createForum(
      this.selectedCategoryId()!,
      this.getNewId(
        this.forumsArrayFormArray()[this.selectedCategoryId()!].value,
      ),
      this.forumsArrayFormArray()[this.selectedCategoryId()!].length,
      {
        name: '',
        description: '',
        metaDescription: '',
      },
    );
  }

  onForumSettingsClick(forumIndex: number): void {
    this.selectedForumForm.set(
      this.forumsArrayFormArray()[this.selectedCategoryId()!].at(forumIndex),
    );

    setTimeout(() => {
      this.forumForumEditComponent()!.open();
    }, 50);
  }

  onForumDeleteClick(forumIndex: number): void {
    this.forumsArrayFormArray()[this.selectedCategoryId()!].removeAt(
      forumIndex,
    );
    this.setForumsIndex(this.selectedCategoryId()!);
  }

  onForumSettingsChange(event: {
    name: string | null;
    description: string | null;
    metaDescription: string | null;
    categoryId: number | null;
  }): void {
    this.selectedForumForm()!.controls.name.setValue(event.name);
    this.selectedForumForm()!.controls.description.setValue(event.description);
    this.selectedForumForm()!.controls.metaDescription.setValue(
      event.metaDescription,
    );

    if (event.categoryId !== this.selectedCategoryId()) {
      this.createForum(
        event.categoryId!,
        this.selectedForumForm()!.controls.id.value,
        0,
        {
          name: this.selectedForumForm()!.controls.name.value!,
          description: this.selectedForumForm()!.controls.description.value!,
          metaDescription:
            this.selectedForumForm()!.controls.metaDescription.value!,
        },
      );
      this.setForumsIndex(event.categoryId!);

      this.forumsArrayFormArray()[this.selectedCategoryId()!].removeAt(
        this.selectedForumForm()!.controls.index.value!,
      );
      this.setForumsIndex(this.selectedCategoryId()!);
    }
  }

  onForumDropped(event: CdkDragDrop<any>) {
    if (event.previousIndex !== event.currentIndex) {
      const formArray = this.forumsArrayFormArray()[this.selectedCategoryId()!];

      moveItemInArray(
        formArray.controls,
        event.previousIndex,
        event.currentIndex,
      );

      this.setForumsIndex(this.selectedCategoryId()!);
    }
  }

  onSubmit(): void {
    const params: Category[] = this.categoriesFormArray().value.map(
      (category) => ({
        id: !category.id || category.id < 0 ? undefined : Number(category.id),
        name: String(category.name),
        metaDescription: String(category.metaDescription),
        index: Number(category.index),
        forums: !this.forumsArrayFormArray()[category.id!]
          ? []
          : this.forumsArrayFormArray()[category.id!].value.map((forum) => ({
              id: !forum.id || forum.id < 0 ? undefined : Number(forum.id),
              name: String(forum.name),
              description: String(forum.description),
              metaDescription: String(forum.metaDescription),
              index: Number(forum.index),
            })),
      }),
    );

    this.onUpdateForum.set('true');

    this.forumService.updateForums(params).subscribe({
      complete: () => {
        this.onUpdateForum.set('success');
      },
    });
  }
}
