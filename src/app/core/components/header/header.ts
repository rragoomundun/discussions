import { Component, inject, HostListener } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { AppState } from '../../../shared/store/app.state';
import { selectConfigModel } from '../../../shared/store/config/config.selectors';
import { selectUserModel } from '../../../shared/store/user/user.selectors';

import * as AuthActions from '../../../shared/store/auth/auth.actions';

import { Config } from '../../../shared/models/Config';
import { User } from '../../../shared/models/User';

@Component({
  selector: 'app-header',
  imports: [TranslateModule, RouterModule, AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private store = inject(Store<AppState>);

  config$: Observable<Config | null>;
  user$: Observable<User | null>;

  constructor() {
    this.config$ = this.store.select(selectConfigModel);
    this.user$ = this.store.select(selectUserModel);
  }

  hideHamburgerMenu(): void {
    const navbarCollapseEl = <HTMLDivElement>(
      document.querySelector('.navbar-collapse.collapse.show')
    );
    navbarCollapseEl.classList.remove('show');
  }

  @HostListener('window:click', ['$event'])
  onWindowClick(event: any): void {
    const header = document.querySelector('header');
    const navbarTogglerEl = document.querySelector(
      '.navbar-collapse.collapse.show',
    );

    if (header?.contains(event.target) === false && navbarTogglerEl) {
      this.hideHamburgerMenu();
    }
  }

  onLogoutClick(): void {
    this.hideHamburgerMenu();
    this.store.dispatch(AuthActions.logout());
  }
}
