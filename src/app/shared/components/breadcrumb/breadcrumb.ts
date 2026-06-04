import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { BreadcrumbItem } from '../../models/BreadcrumbItem';

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterModule, TranslateModule],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss',
})
export class Breadcrumb {
  items = input<BreadcrumbItem[]>([]);
}
