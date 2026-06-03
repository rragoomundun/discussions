import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { Category as CategoryModel } from '../../../../shared/models/Category';

import { ForumLink as ForumLinkComponent } from '../../../../shared/components/forum-link/forum-link';

import { Category as CategoryService } from '../../../../shared/services/category/category';
import { Seo as SeoService } from '../../../../shared/services/seo/seo';

@Component({
  selector: 'app-category-home',
  imports: [TranslateModule, ForumLinkComponent],
  templateUrl: './category-home.html',
  styleUrl: './category-home.scss',
})
export class CategoryHome {
  private route = inject(ActivatedRoute);
  private categoryService = inject(CategoryService);
  private seoService = inject(SeoService);

  category = signal<CategoryModel | null>(null);
  onLoad = signal('false');

  constructor() {
    const param = this.route.snapshot.paramMap.get('category') ?? '';
    const categoryId = parseInt(param.split('-')[0], 10);

    this.onLoad.set('true');

    this.categoryService.getCategoryForums(categoryId).subscribe({
      next: (data) => {
        this.category.set(data);
        this.seoService.updateTitle(data.name);
        this.seoService.updateDescription(data.metaDescription);
        this.onLoad.set('success');
      },
      error: () => {
        this.onLoad.set('error');
      },
    });
  }
}
