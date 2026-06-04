import { Component, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { BreadcrumbItem } from '../../../../shared/models/BreadcrumbItem';

import { Breadcrumb as BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb';

import { Translation as TranslationService } from '../../../../shared/services/translation/translation';

import { filter } from 'rxjs';

@Component({
  selector: 'app-forum-settings',
  imports: [RouterModule, TranslateModule, BreadcrumbComponent],
  templateUrl: './forum-settings.html',
  styleUrl: './forum-settings.scss',
})
export class ForumSettings implements OnInit {
  private translationService = inject(TranslationService);

  router = inject(Router);

  breadcrumbItems = signal<BreadcrumbItem[]>([]);

  selectedSection: string = '';

  ngOnInit(): void {
    this.setSelectedSection();

    this.breadcrumbItems.set([
      {
        link: `/forum-settings/${this.selectedSection}`,
        title: this.translationService.instant(
          'FORUM_SETTINGS_PAGE.CONFIGURATION_PAGE.TITLE',
        ),
      },
    ]);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.setSelectedSection();
      });
  }

  setSelectedSection() {
    if (this.router.url.includes('general')) {
      this.selectedSection = 'general';
    } else if (this.router.url.includes('forums')) {
      this.selectedSection = 'forums';
    } else if (this.router.url.includes('bottom-links')) {
      this.selectedSection = 'bottom-links';
    }
  }

  onMobileSectionSelectorChange(event: Event) {
    const target = event.target as HTMLSelectElement | null;

    if (target) {
      const { value } = target;
      this.router.navigate([`/forum-settings/${value}`]);
    }
  }
}
