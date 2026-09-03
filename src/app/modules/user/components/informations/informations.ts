import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

import { UserInformations } from '../../../../shared/models/UserInformations';

import { User as UserService } from '../../../../shared/services/user/user';

import * as textUtil from '../../../../shared/utils/text/text.util';

@Component({
  selector: 'app-informations',
  imports: [TranslateModule, DatePipe],
  templateUrl: './informations.html',
  styleUrl: './informations.scss',
})
export class Informations {
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);

  informations = signal<UserInformations | null>(null);
  onLoad = signal('false');

  biographyHtml = computed(() => {
    const biography = this.informations()?.biography;

    return biography ? textUtil.markdownToHTML(biography) : null;
  });

  constructor() {
    const param = this.route.parent?.snapshot.paramMap.get('id') ?? '';
    const userId = parseInt(param.split('-')[0], 10);

    this.onLoad.set('true');

    this.userService.getUserInformations(userId).subscribe({
      next: (data) => {
        this.informations.set(data);
        this.onLoad.set('success');
      },
      error: () => {
        this.onLoad.set('error');
      },
    });
  }
}
