import {
  Component,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';

import { AsyncPipe, DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable, filter } from 'rxjs';

import { AppState } from '../../../../shared/store/app.state';
import { selectUserModel } from '../../../../shared/store/user/user.selectors';

import { User } from '../../../../shared/models/User';
import { UserProfile } from '../../../../shared/models/UserProfile';
import { BreadcrumbItem } from '../../../../shared/models/BreadcrumbItem';
import { WarningTarget } from '../../../../shared/models/WarningTarget';

import { Breadcrumb as BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb';
import { GiveWarning as GiveWarningComponent } from '../../../../shared/components/give-warning/give-warning';

import { User as UserService } from '../../../../shared/services/user/user';
import { Seo as SeoService } from '../../../../shared/services/seo/seo';

@Component({
  selector: 'app-profile',
  imports: [
    RouterModule,
    TranslateModule,
    DatePipe,
    AsyncPipe,
    BreadcrumbComponent,
    GiveWarningComponent,
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(Store<AppState>);
  private userService = inject(UserService);
  private seoService = inject(SeoService);

  profile = signal<UserProfile | null>(null);
  breadcrumbItems = signal<BreadcrumbItem[]>([]);
  onLoad = signal('false');
  onUpdateActiveStatus = signal('false');
  warnTarget = computed<WarningTarget | undefined>(() =>
    this.profile() ? { id: this.userId, name: this.profile()!.name } : undefined,
  );

  user$: Observable<User | null | undefined>;

  selectedSection: string = '';

  param: string;

  userId: number;

  giveWarningComponent = viewChild(GiveWarningComponent);

  constructor() {
    this.user$ = this.store.select(selectUserModel);

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
    } else if (this.router.url.includes('/warnings')) {
      this.selectedSection = 'warnings';
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

  onWarnClick(): void {
    this.giveWarningComponent()?.open();
  }

  onActiveStatusClick(): void {
    const active = !this.profile()?.active;

    this.onUpdateActiveStatus.set('true');

    this.userService.updateActiveStatus(this.userId, active).subscribe({
      next: () => {
        this.profile.set({ ...this.profile()!, active });
        this.onUpdateActiveStatus.set('success');
      },
      error: () => {
        this.onUpdateActiveStatus.set('error');
      },
    });
  }
}
