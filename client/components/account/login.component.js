'use strict'

import { Component } from '@angular/core'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'login',
  template: `
    <form name="login">
      <h1>Chat Project</h1>
      <label>Email</label>
      <input type="email" [(ngModel)]="model.email" name="email">
      <label>Senha</label>
      <input type="password" [(ngModel)]="model.password" name="password">
      <button type="submit" (click)="onSubmit()">Entrar</button>
      <a routerLink="/signup">Cadastre-se</a>
    </form>
  `
})
export class LoginComponent {
  constructor (auth: AuthService, router: Router) {
    this.router = router
    this.auth = auth
  }
  ngOnInit () {
    this.model = {}
    this.errors = {}
  }
  onSubmit () {
    this.auth.login(this.model)
      .then(user => {
        this.router.navigate(['']);
      })
      .catch(err => {
        console.log(err)
      })
  }
}
