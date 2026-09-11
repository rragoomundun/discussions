import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { SearchResult as SearchResultModel } from '../../../../shared/models/SearchResult';
import { BreadcrumbItem } from '../../../../shared/models/BreadcrumbItem';

import { SearchResult as SearchResultComponent } from '../../../../shared/components/search-result/search-result';
import { Pagination as PaginationComponent } from '../../../../shared/components/pagination/pagination';
import { Breadcrumb as BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb';

import { Search as SearchService } from '../../../../shared/services/search/search';
import { Translation as TranslationService } from '../../../../shared/services/translation/translation';

@Component({
  selector: 'app-search',
  imports: [
    RouterModule,
    TranslateModule,
    SearchResultComponent,
    PaginationComponent,
    BreadcrumbComponent,
  ],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private searchService = inject(SearchService);
  private translationService = inject(TranslationService);

  breadcrumbItems = signal<BreadcrumbItem[]>([]);

  nbPages = signal(1);
  results = signal<SearchResultModel[]>([]);
  onLoadMeta = signal('false');
  onLoadResults = signal('false');

  query = signal('');

  private page: number | null;

  constructor() {
    this.breadcrumbItems.set([
      {
        link: '/search',
        title: this.translationService.instant('SEARCH_PAGE.TITLE'),
      },
    ]);

    this.query.set(this.route.snapshot.queryParams['query'] ?? '');

    const pageQueryParam = this.route.snapshot.queryParams['page'];
    this.page = pageQueryParam ? parseInt(pageQueryParam, 10) : null;

    this.fetchMeta();
    this.fetchResults();

    this.route.queryParams.subscribe(() => {
      const newQuery = this.route.snapshot.queryParams['query'] ?? '';
      const newPageQueryParam = this.route.snapshot.queryParams['page'];
      const newPage = newPageQueryParam ? parseInt(newPageQueryParam, 10) : null;

      const queryChanged = newQuery !== this.query();
      const pageChanged = newPage !== this.page;

      if (!queryChanged && !pageChanged) {
        return;
      }

      this.query.set(newQuery);
      this.page = newPage;

      if (queryChanged) {
        this.fetchMeta();
      }

      this.fetchResults();
    });
  }

  fetchMeta(): void {
    this.onLoadMeta.set('true');

    this.searchService.getSearchMeta(this.query()).subscribe({
      next: (data) => {
        this.nbPages.set(data.nbPages);
        this.onLoadMeta.set('success');
      },
      error: () => {
        this.onLoadMeta.set('error');
      },
    });
  }

  fetchResults(): void {
    this.onLoadResults.set('true');

    this.searchService.getSearchResults(this.query(), this.page).subscribe({
      next: (data) => {
        this.results.set(data);
        this.onLoadResults.set('success');
      },
      error: () => {
        this.onLoadResults.set('error');
      },
    });
  }

  onSearch(value: string): void {
    this.router.navigate(['/search'], { queryParams: { query: value } });
  }
}
