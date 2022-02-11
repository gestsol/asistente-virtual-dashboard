
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UtilsService } from '../utils.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private router: Router, public utils: UtilsService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token')!;
    let request = req;
    let url = request.url.split('/')

    //Si exite el token y el endpoint no apunta al signin, enviar el token en el header de la requests
    if (token && !url.includes('signin')) {
      const tokenParse = JSON.parse(token)?.token
      request = req.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${tokenParse}`
        }),
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {

        // if (err.status === 401) {
        //   this.router.navigateByUrl('/auth/signin');
        // }
        let message


        //Verificamos si tiene un mensaje personalizado del Server
        if (err.error.hasOwnProperty('error')) {
          message = err.error.error
        }

        this.utils.errorAlert(message || err.message)
        return throwError(err.message);

      })
    );

  }
}