import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { ApiService } from '../core/services/api.service';
import { ArticleFiltersModel } from './article-filters-model';
import { Article } from './article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  url = 'articles';
  private articles:Subject<Article[]> = new  Subject();
  articles$: Observable<Article[]> =this.articles.asObservable();
  private articlesLoading:Subject<boolean> = new  Subject();
  articlesLoading$: Observable<boolean> =this.articlesLoading.asObservable();
  private totalPages:Subject<number[]> = new  Subject();
  totalPages$: Observable<number[]> =this.totalPages.asObservable();

  constructor(private apiService: ApiService) { }

  setArticlesList(config: ArticleFiltersModel): void {
    const params: any = {}; 
    this.articlesLoading.next(true);
   if(config!==undefined){
      Object.keys(config.filters)
      .forEach((key: string) => {
        params[key] = (config.filters as any)[key];
      });
   }
   
    const httpParams = new HttpParams({ fromObject: { ...params } });

    this.apiService.get(
     this.url + ((config.type === 'feed') ? '/feed' : ''), httpParams).subscribe({next:(res:any) =>{
       console.log(res);
       if(config.filters.limit){
          this.totalPages.next(Array.from(new Array(Math.ceil(res.articlesCount /config.filters.limit)), 
       (val, index) => index + 1));
       }
      
       this.articles.next(res.articles)
       this.articlesLoading.next(false)
     }
     ,error:()=>{
         this.articlesLoading.next(false);
     }});
    }
    delete(slug:string) {
      return this.apiService.delete(`${this.url}/${slug}`);
    }
    get(slug:string): Observable<Article> {
      return this.apiService.get(`${this.url}/${slug}`)
        .pipe(map(data => data.article));
    }
    favorite(slug:string): Observable<Article> {
      return this.apiService.post(`${this.url}/${slug}/favorite`);
    }
  
    unfavorite(slug:string): Observable<unknown> {
      return this.apiService.delete(`${this.url}/${slug}/favorite`);
    }
    
  }
    
    
  

