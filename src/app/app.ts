import { Component, inject, DestroyRef } from '@angular/core';
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
  selectConfigConfigExists,
  selectConfigModel,
  selectConfigOnGetExists,
  selectOnGetConfig,
} from './shared/store/config/config.selectors';
import { selectOnGetUser } from './shared/store/user/user.selectors';

import { Header as HeaderComponent } from './core/components/header/header';
import { Footer as FooterComponent } from './core/components/footer/footer';

import { Translation as TranslationService } from './shared/services/translation/translation';

import { Config } from './shared/models/Config';

import { App as AppService } from './shared/services/app/app';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private titleService = inject(Title);
  private translationService = inject(TranslationService);
  private store = inject(Store);

  appService = inject(AppService);

  configExists$: Observable<{ config: boolean; admin: boolean } | null>;
  config$: Observable<Config | null>;
  onGetExists$: Observable<string>;
  onGetConfig$: Observable<string>;
  onGetUser$: Observable<string>;

  title: string | null = null;
  forumTitle: string | null = null;

  constructor() {
    this.configExists$ = this.store.select(selectConfigConfigExists);
    this.config$ = this.store.select(selectConfigModel);
    this.onGetExists$ = this.store.select(selectConfigOnGetExists);
    this.onGetConfig$ = this.store.select(selectOnGetConfig);
    this.onGetUser$ = this.store.select(selectOnGetUser);

    const configSubscription = this.config$.subscribe(
      (value: Config | null) => {
        this.forumTitle = <string>value?.title;

        if (value?.favicon) {
          this.appService.setFavicon(
            value.favicon,
          );
        }

        this.translationService.onLangChange().subscribe(() => {
          this.setTitle();
        });

        this.setTitle();
      },
    );

    this.destroyRef.onDestroy(() => configSubscription.unsubscribe());

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
        }),
      )
      .subscribe((title: string) => {
        this.title = title;

        this.translationService.onLangChange().subscribe(() => {
          this.setTitle();
        });

        this.setTitle();
      });
  }

  setTitle(): void {
    if (this.title) {
      if (this.title === 'APP.TITLE') {
        this.titleService.setTitle(
          this.translationService.instant('APP.TITLE'),
        );
      } else {
        if (this.router.url === '/setup') {
          this.titleService.setTitle(
            `${this.translationService.instant(
              this.title,
            )} - ${this.translationService.instant('APP.TITLE')}`,
          );
        } else {
          this.titleService.setTitle(
            `${this.translationService.instant(this.title)} - ${this.forumTitle}`,
          );
        }
      }
    }
  }
}
