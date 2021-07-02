import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from './auth.service';

@Injectable({providedIn: "root"})

export class AuthGuard implements CanActivate{
    
    constructor(
        private auth: AuthService,
        private router: Router
        ){}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            if(this.auth.isAuth){
                return true
            }else{
                this.router.navigate(['/login'], {
                    queryParams:{
                        accessDenied: true
                    }
                })
                return false
            }
    }
}