import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {ErrosComponent} from './erros/errors.component';
import { FavoriteButtonComponent } from './buttons/favorite-button/favorite-button.component';
import { FollowButtonComponent } from './buttons/follow-button/follow-button.component'

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    ErrosComponent,
    FavoriteButtonComponent,
    FollowButtonComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,   
    RouterModule
  ],
  exports:[FooterComponent, HeaderComponent, ErrosComponent, FavoriteButtonComponent, FollowButtonComponent]
})
export class SharedModule { }
