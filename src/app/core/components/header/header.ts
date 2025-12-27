import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { AppState } from '../../../shared/store/app.state';
import { selectConfigModel } from '../../../shared/store/config/config.selectors';

import { Config } from '../../../shared/models/Config';

@Component({
  selector: 'app-header',
  imports: [TranslateModule, RouterModule, AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private store = inject(Store<AppState>);

  config$: Observable<Config | null>;

  constructor() {
    this.config$ = this.store.select(selectConfigModel);
  }
}
