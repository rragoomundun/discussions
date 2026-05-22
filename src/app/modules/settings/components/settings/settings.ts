import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { filter } from 'rxjs';

@Component({
  selector: 'app-settings',
  imports: [RouterModule, TranslateModule],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings implements OnInit {
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
