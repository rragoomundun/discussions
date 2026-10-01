import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { UserWarning } from '../../../../shared/models/UserWarning';

import { WarningItem as WarningItemComponent } from '../warning-item/warning-item';

import { Warning as WarningService } from '../../../../shared/services/warning/warning';

@Component({
  selector: 'app-warnings',
  imports: [TranslateModule, WarningItemComponent],
  templateUrl: './warnings.html',
  styleUrl: './warnings.scss',
})
export class Warnings {
  private route = inject(ActivatedRoute);
  private warningService = inject(WarningService);

  warnings = signal<UserWarning[]>([]);
  onLoad = signal('false');

  private userId: number;

  constructor() {
    const param = this.route.parent?.snapshot.paramMap.get('id') ?? '';
    this.userId = parseInt(param.split('-')[0], 10);

    this.onLoad.set('true');

    this.warningService.getUserWarnings(this.userId).subscribe({
      next: (data) => {
        this.warnings.set(data);
        this.onLoad.set('success');
      },
      error: () => {
        this.onLoad.set('error');
      },
    });
  }
}
