import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingInterceptor implements HttpInterceptor {

constructor(private router:Router) { }
intercept(request: HttpRequest<any> , next: HttpHandler): Observable<HttpEvent<any>>{
    return next.handle(request).pipe(
      catchError((error : HttpErrorResponse) => {
        const errorMassage = this.setError(error);
        //console.log(error)
        return throwError(errorMassage)
      })
    );
  }
  setError(error:HttpErrorResponse){
    let errorMassage = 'unknown occured';
    if(error.error instanceof ErrorEvent){
      errorMassage = error.error.message;
    }else{
      if(error.status === 404){
        errorMassage = error.error;
        //console.log(error.status)
        return error.status
        //this.router.navigate(['/not-found']);
      }
      if(error.status === 0 || error.status === 500 ){
        errorMassage = error.error;
        //this.router.navigate(['/no-internet']);
      }
    }
    return errorMassage;
  }
}
