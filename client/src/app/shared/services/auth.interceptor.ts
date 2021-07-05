import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MaterialService } from './material.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor{

    constructor(
        private auth: AuthService,
        private router: Router
        ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        if(this.auth.isAuth()){
            req = req.clone({
                setHeaders:{
                    Authorization: this.auth.getToken()
                }
            })
        }

        return next.handle(req)
        .pipe(
            catchError((error: HttpErrorResponse)=>{
                MaterialService.toasts(error.error.message)
                if(error.status === 401){
                    this.router.navigate(['/login'], {
                        queryParams: {
                            sessionFailed: true
                        }
                    })
                }
                return throwError(error)
            })
        )
    }
}