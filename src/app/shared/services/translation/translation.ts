import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Translation {
  private translateService = inject(TranslateService);

  get(key: string): Observable<any> {
    return this.translateService.get(key);
  }

  instant(key: string): string {
    return this.translateService.instant(key);
  }
}
