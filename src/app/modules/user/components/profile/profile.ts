import { Component, inject, signal } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { filter } from 'rxjs';

import { UserProfile } from '../../../../shared/models/UserProfile';
import { BreadcrumbItem } from '../../../../shared/models/BreadcrumbItem';

import { Breadcrumb as BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb';

import { User as UserService } from '../../../../shared/services/user/user';
import { Seo as SeoService } from '../../../../shared/services/seo/seo';

@Component({
  selector: 'app-profile',
  imports: [RouterModule, TranslateModule, DatePipe, BreadcrumbComponent],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private userService = inject(UserService);
  private seoService = inject(SeoService);

  profile = signal<UserProfile | null>(null);
  breadcrumbItems = signal<BreadcrumbItem[]>([]);
  onLoad = signal('false');

  selectedSection: string = '';

  param: string;

  private userId: number;

  constructor() {
    this.param = this.route.snapshot.paramMap.get('id') ?? '';
    this.userId = parseInt(this.param.split('-')[0], 10);

    this.setSelectedSection();
    this.getUserProfile();

    this.route.paramMap.subscribe((params) => {
      this.param = this.route.snapshot.paramMap.get('id') ?? '';
      this.userId = parseInt(this.param.split('-')[0], 10);

      this.setSelectedSection();
      this.getUserProfile();
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setSelectedSection();
      });
  }

  getUserProfile(): void {
    this.onLoad.set('true');

    this.userService.getUserProfile(this.userId).subscribe({
      next: (data) => {
        this.profile.set(data);
        this.breadcrumbItems.set([{ link: this.param, title: data.name }]);
        this.seoService.updateTitle(data.name);
        this.onLoad.set('success');
      },
      error: () => {
        this.onLoad.set('error');
      },
    });
  }

  setSelectedSection(): void {
    if (this.router.url.includes('/discussions')) {
      this.selectedSection = 'discussions';
    } else if (this.router.url.includes('/messages')) {
      this.selectedSection = 'messages';
    } else {
      this.selectedSection = 'informations';
    }
  }

  onMobileSectionSelectorChange(event: Event): void {
    const target = event.target as HTMLSelectElement | null;

    if (target) {
      const { value } = target;
      this.router.navigate([`/user/${this.param}/${value}`]);
    }
  }
}
