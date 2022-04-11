import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
  isAuthed: Observable<boolean>;

  constructor(authService:AuthService) {
    this.isAuthed = authService.isAuthenticated$;
   }
}
