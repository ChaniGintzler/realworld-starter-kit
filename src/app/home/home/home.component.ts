import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleFiltersModel } from 'src/app/article/article-filters-model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isAuthenticated = false;
  listConfig:ArticleFiltersModel|undefined;// = { type: '', filters: {limit:5} };
  constructor(
    private router: Router,
    // private tagsService: TagsService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;
        if (authenticated) {
          this.setListTo('feed');
        } else {
          this.setListTo('all');
        }
      }
    );

    // this.tagsService.getAll()
    // .subscribe(tags => {
    //   this.tags = tags;
    //   this.tagsLoaded = true;
    // });
  }

  setListTo(type = '', filters = {limit:10}) {
    if (type === 'feed' && !this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return;
    }
    this.listConfig = { type: type, filters: filters };
  }
}
