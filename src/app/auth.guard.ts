import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from 'rxjs'
import { AuthService } from "./auth.service";


@Injectable({
providedIn: 'root',
});

export class AuthGuard implements CanActivate {

  constructor(private authGuardService: AuthService, private router: Router){}

  canActivate()
    {
      if(this.authGuardService.isLogged){
        return true ; 
      } 

      this.router.navigate(['/login']);
      return false;
      
    }
}