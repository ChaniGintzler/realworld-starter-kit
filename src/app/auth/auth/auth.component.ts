import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Errors } from 'src/app/shared/erros/models/erros.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  form: FormGroup ;
  authType: 'login'| 'register'='login';
  title: string='';
  showErrors: boolean = false;
  showEmailExistsMessage =false;
  errorsList:Errors={errors:{}};
  constructor(private fb: FormBuilder,
     private route:ActivatedRoute,
     private router:Router,
    private authService:AuthService) { 
    this.form = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
    this.route.url.subscribe(data => {
      this.authType = data[data.length - 1].path as typeof this.authType;
      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
      if (this.authType === 'register') {
        this.form.addControl('username', new FormControl());
      }
    });
  }

  submitForm(){
    if(this.form.valid){
       this.authService.attemptAuth(this.authType,this.form.value).subscribe(
         {
           next:(res)=>{this.router.navigate([''])},
           error: (error: Errors) => {this.errorsList=error}
          });
    }
     else{
       this.showErrors=true;
     }
  }
  ngOnInit(): void {
  }

}
