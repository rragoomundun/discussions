import { Component, computed, inject, input } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { DatePipe } from '@angular/common';

import { Message as MessageModel } from '../../models/Message';

import { Util as UtilService } from '../../services/util/util';
import { Translation as TranslationService } from '../../services/translation/translation';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-message',
  imports: [TranslateModule, RouterModule, DatePipe],
  templateUrl: './message.html',
  styleUrl: './message.scss',
})
export class Message {
  utilService = inject(UtilService);
  translationService = inject(TranslationService);

  message = input<MessageModel>();
  authorImage = computed(() => {
    if (!this.message()?.author.image) {
      return null;
    }

    return `${environment.API_URL}${this.message()?.author.image}`;
  });
  authorLink = computed(() => {
    return `/user/${this.message()?.author.id}-${this.utilService.getSlug(this.message()!.author!.name)}`;
  });
  editorLink = computed(() => {
    if (!this.message()?.editor) {
      return null;
    }

    return `/user/${this.message()?.editor?.id}-${this.utilService.getSlug(<string>this.message()?.editor?.name)}`;
  });
}
