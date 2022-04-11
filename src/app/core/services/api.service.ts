import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }
  
  private formatErrors(error: any) {
    return  throwError(error.error);
  }

  get(path:string, params: HttpParams = new HttpParams()):Observable<any>{
    return this.http.get(`${this.baseUrl}${path}`,{params})
    .pipe(catchError(this.formatErrors));
  }
  post(path:string, body: unknown = {}):Observable<any>{
    return this.http.post(`${this.baseUrl}${path}`,body)
    .pipe(catchError(this.formatErrors));
  }
  put(path:string, params:string, body:unknown):Observable<any>{
    return this.http.put(`${this.baseUrl}${path}${params}`,body)
    .pipe(catchError(this.formatErrors));
  }
  delete(path:string):Observable<unknown>{
    return this.http.delete(`${this.baseUrl}${path}`)
    .pipe(catchError(this.formatErrors));
  }
}
