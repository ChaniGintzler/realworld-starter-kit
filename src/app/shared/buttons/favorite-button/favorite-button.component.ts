import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/article/article.model';
import { ArticleService } from 'src/app/article/article.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteButtonComponent {
  isAuth: boolean | undefined;
  @Input() article: Article | undefined;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;
  constructor(private auth: AuthService, private router: Router,
    private articlesService: ArticleService, private cdRef: ChangeDetectorRef) {
    this.auth.isAuthenticated$.subscribe(auth => this.isAuth = auth);
  }

  toggleFavorite(): void {
    if (!this.article) {
      return;
    }
    if (!this.isAuth) {
      this.router.navigateByUrl('/login');
    } else {
      if (!this.article.favorited) {
        this.articlesService.favorite(this.article.slug).subscribe({
          next: () => {
            this.onSaved(true);
            // this.isSubmitting = false;
            // if (this.article) {
            //   this.article.favorited = true;
            //   this.article.favoritesCount++;
            // }
            // this.toggle.emit(true);
          }, error: () => this.isSubmitting = false
        });

      } else {
        this.articlesService.unfavorite(this.article.slug).subscribe({
          next: () => {
             this.onSaved(false);
            // this.isSubmitting = false;
            // this.toggle.emit(false);
            // if (this.article) {
            //   this.article.favorited = false;
            //   this.article.favoritesCount--;
            // }
          }, error: () => this.isSubmitting = false
        });
      }
    }
  }

  onSaved(favorite: boolean) {
    this.isSubmitting = false;
    this.toggle.emit(favorite); 
    if (!this.article) { return; }
    this.article.favorited = favorite;
    if (!favorite) {
      this.article.favoritesCount--;
    } else {
      this.article.favoritesCount++;
    }
   this.cdRef.markForCheck();
  }
}

