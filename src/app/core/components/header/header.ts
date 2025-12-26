import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [TranslateModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
