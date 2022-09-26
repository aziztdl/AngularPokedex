import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
  message: string = "Vous êtes déconnecté.";
  name: string;
  password: string;
  auth: AuthService;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth = this.authService;
  }

  setMessage() {
    if (this.auth.isLogged) {
      this.message = "Vous êtes connecté.";
    } else {
      this.message = "Vous êtes déconnecté.";
    }
  }

  login() {
    this.message = "Tentative de connexion";
    this.auth.login(this.name, this.password).subscribe((isLogged: boolean) => {
      this.setMessage();
      if (isLogged) {
        this.router.navigate(["/pokemons"]);
      } else {
        this.password = "";
        this.router.navigate(["/login"]);
      }
    });
  }

  logout() {
    this.auth.logout();
    this.message = "Vous êtes déconnecté.";
  }
}
