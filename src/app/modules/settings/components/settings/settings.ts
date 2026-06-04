import { Component, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { BreadcrumbItem } from '../../../../shared/models/BreadcrumbItem';

import { Breadcrumb as BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb';

import { Translation as TranslationService } from '../../../../shared/services/translation/translation';

import { filter } from 'rxjs';

@Component({
  selector: 'app-settings',
  imports: [RouterModule, TranslateModule, BreadcrumbComponent],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings implements OnInit {
  private translationService = inject(TranslationService);

  router = inject(Router);

  breadcrumbItems = signal<BreadcrumbItem[]>([]);

  selectedSection: string = '';

  ngOnInit(): void {
    this.setSelectedSection();

    this.breadcrumbItems.set([
      {
        link: `/settings/${this.selectedSection}`,
        title: this.translationService.instant('SETTINGS_PAGE.TITLE'),
      },
    ]);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.setSelectedSection();
      });
  }

  setSelectedSection() {
    if (this.router.url.includes('email')) {
      this.selectedSection = 'email';
    } else if (this.router.url.includes('security')) {
      this.selectedSection = 'security';
    } else if (this.router.url.includes('picture')) {
      this.selectedSection = 'picture';
    } else if (this.router.url.includes('informations')) {
      this.selectedSection = 'informations';
    } else if (this.router.url.includes('signature')) {
      this.selectedSection = 'signature';
    }
  }

  onMobileSectionSelectorChange(event: Event) {
    const target = event.target as HTMLSelectElement | null;

    if (target) {
      const { value } = target;
      this.router.navigate([`/settings/${value}`]);
    }
  }
}
