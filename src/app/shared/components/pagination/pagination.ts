import { Component, computed, inject, input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  nbPages = input.required<number>();

  currentPage = toSignal(
    this.route.queryParamMap.pipe(
      map((params) => parseInt(params.get('page') ?? '1', 10)),
    ),
    { initialValue: 1 },
  );

  pages = computed(() =>
    Array.from({ length: this.nbPages() }, (_, i) => i + 1),
  );

  get page(): number {
    return parseInt(this.route.snapshot.queryParams['page'] || '1');
  }

  get pagesEnd(): number[] {
    const start = this.nbPages() - 3;
    const pagesArray = [];

    for (let i = start; i <= this.nbPages(); i++) {
      pagesArray.push(i);
    }

    return pagesArray;
  }

  get pagesIn(): number[] {
    const start = this.page - 1;
    const end = this.page + 1;
    const pagesArray = [];

    for (let i = start; i <= end; i++) {
      pagesArray.push(i);
    }

    return pagesArray;
  }

  navigate(page: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
  }
}
