import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { filter } from 'rxjs';

@Component({
  selector: 'app-forum-settings',
  imports: [RouterModule, TranslateModule],
  templateUrl: './forum-settings.html',
  styleUrl: './forum-settings.scss',
})
export class ForumSettings implements OnInit {
  router = inject(Router);

  selectedSection: string = '';

  ngOnInit(): void {
    this.setSelectedSection();

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
