import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, ReplaySubject, Subject, tap } from 'rxjs';
import { ApiService } from '../core/services/api.service';
import { JwtService } from './jwt.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 private isAuthenticated: BehaviorSubject<boolean> ;
 private currentUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
 isAuthenticated$;//= this.isAuthenticated.asObservable();
 currentUser$ = this.currentUser.asObservable();
  url = '/users/'
  constructor(private apiService: ApiService, private jwtService: JwtService, private router: Router) {
    this.isAuthenticated = new BehaviorSubject<boolean>(jwtService.getToken()!==null);
    this.isAuthenticated$ = this.isAuthenticated.asObservable();
   }

  attemptAuth(type: 'login' | 'register', credentials: unknown) {
    return this.apiService.post(`${this.url}${type}`, { user: credentials })
      .pipe(tap(
        data => {
          this.setAuth(data.user);
        }
      ));
  }
  setAuth(user: User) {
    this.currentUser.next(user);
    this.isAuthenticated.next(true);
    this.saveToken(user.token)
  }


  saveToken(token: string) {
    this.jwtService.saveToken(token);
  }

  getToken() {
   return this.jwtService.getToken();
  }

  logout(): void {
    this.jwtService.clearToken();
    this.isAuthenticated.next(false);
    this.currentUser.next(null);
    this.router.navigate(['']);
  }
}
