import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { tap, delay } from "rxjs/operators";

@Injectable({

  providedIn: 'root',

});

export class AuthService {

  isLogged: boolean = false;

  login(name: string, password: string): Observable<boolean>{
    const isLogged = (name == "pikatchu" && password == "pikatchu");

    return of(isLogged).pipe(
      delay(1000),
      tap(isLogged => this.isLogged = isLogged)
      );
  }

  logout(){
    this.isLogged = false;
  }
}
