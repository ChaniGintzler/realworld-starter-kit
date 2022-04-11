import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleFiltersModel } from '../article-filters-model';
import { Article } from '../article.model';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent {
  articles$: Observable<Article[]>;
  private _listConfig: ArticleFiltersModel | undefined;
  //@Input() limit = 10;
  @Input()
  set listConfig(config: ArticleFiltersModel | undefined) {
    if (config) {
      this._listConfig = config;
      this.currentPage = 1;
      this.setList();
    }

  }
  articlesLoading$: Observable<boolean>;
  totalPages$: Observable<number[]>;
  currentPage: number | undefined;

  constructor(private articlesService: ArticleService) {
    this.articles$ = articlesService.articles$;
    this.articlesLoading$ = articlesService.articlesLoading$;
    this.totalPages$ = articlesService.totalPages$;
    // this.articlesService.setArticlesList(this.listConfig);
  }

  moveToPage(pageNum: number): void {
    this.currentPage = pageNum;
    if (this._listConfig && this._listConfig.filters.limit) {
      this._listConfig.filters.offset = (this._listConfig.filters.limit * (this.currentPage - 1));
    }
    this.setList();
  }

  setList() {
    if (this._listConfig) {
      this.articlesService.setArticlesList(this._listConfig);
    }
    else {
      this.articlesService.setArticlesList({ type: '', filters: {} });
    }
  }
}
