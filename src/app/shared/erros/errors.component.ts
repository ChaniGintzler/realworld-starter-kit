import { Component, OnInit , Input} from '@angular/core';
import { Errors } from './models/erros.model';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrosComponent  {
  formattedErrors: Array<string> = [];
  @Input()
  set errors(errorList: Errors) {
    this.formattedErrors = Object.keys(errorList.errors || {})
      .map(key => `${key} ${errorList.errors[key]}`);
  }

  get errorList() { return this.formattedErrors; }

  trackByFn(index:number) {
    return index;
  }
}
