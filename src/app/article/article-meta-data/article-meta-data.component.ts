import { Component,  ChangeDetectionStrategy, Input } from '@angular/core';
import { Article } from '../article.model';

@Component({
  selector: 'app-article-meta-data',
  templateUrl: './article-meta-data.component.html',
  styleUrls: ['./article-meta-data.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleMetaDataComponent {
@Input() article:Article |undefined ;
  
// onToggleFavorite(favorited: boolean) {
//   if(!this.article)
//   return;
//   this.article.favorited= favorited;

//   if (favorited) {
//     this.article['favoritesCount']++;
//   } else {
//     this.article['favoritesCount']--;
//   }
//}
}
