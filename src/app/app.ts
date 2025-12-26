import { Component, inject } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  RouterOutlet,
  NavigationEnd,
} from '@angular/router';

import { AsyncPipe } from '@angular/common';

import { Title } from '@angular/platform-browser';

import { filter, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  selectConfigExists,
  selectConfigOnGetExists,
} from './shared/store/config/config.selectors';

import { Header as HeaderComponent } from './core/components/header/header';
import { Footer as FooterComponent } from './core/components/footer/footer';

import { Translation as TranslationService } from './shared/services/translation/translation';
import { App as AppService } from './shared/services/app/app';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private router = inject(Router);
  private titleService = inject(Title);
  private translationService = inject(TranslationService);
  private store = inject(Store);

  appService = inject(AppService);

  configExists$: Observable<boolean>;
  onGetConfigExists$: Observable<string>;

  constructor() {
    this.configExists$ = this.store.select(selectConfigExists);
    this.onGetConfigExists$ = this.store.select(selectConfigOnGetExists);

    this.router.events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd),
        map(() => {
          let route: ActivatedRoute = this.router.routerState.root;
          let routeTitle = '';

          while (route!.firstChild) {
            route = route.firstChild;
          }

          if (route.snapshot.data['title']) {
            routeTitle = route!.snapshot.data['title'];
          }

          return routeTitle;
        })
      )
      .subscribe((title: string) => {
        if (title) {
          if (title === 'APP.TITLE') {
            this.titleService.setTitle(
              this.translationService.instant('APP.TITLE')
            );
          } else {
            this.titleService.setTitle(
              `${this.translationService.instant(
                title
              )} - ${this.translationService.instant('APP.TITLE')}`
            );
          }
        }
      });
  }
}
