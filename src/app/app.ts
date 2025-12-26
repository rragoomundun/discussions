import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header as HeaderComponent } from './core/components/header/header';
import { Footer as FooterComponent } from './core/components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('discussions');
}
