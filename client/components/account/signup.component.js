'use strict';

import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'


@Component({
  selector: 'signup',
  template: `
    <form name="signup">
      <h1>Chat Project</h1>
      <div class="name-email">
        <div class="username">
          <label>@Username</label>
          <input type="text" [(ngModel)]="model.username" name="username">
        </div>
        <div class="email">
          <label>Email</label>
          <input type="email" [(ngModel)]="model.email" name="email">
        </div>
      </div>
      <label>Senha</label>
      <input type="password" [(ngModel)]="model.password" name="email">
      <p *ngIf="errorMessage"> {{ errorMessage }}</p>
      <button type="submit" (click)="onSubmit()">Cadastrar</button>
      <a routerLink="/login">Login</a>
    </form>
  `
})
export class SignupComponent {
  constructor (auth: AuthService, router: Router) {
    this.router = router
    this.auth = auth
  }
  ngOnInit () {
    this.model = {}
    this.erros = {}
  }
  onSubmit () {
    this.auth.signup(this.model)
      .then(user => {
        this.router.navigate(['welcome'])
      })
      .catch(err => {
        if (err.status === 401) {
          return this.errorMessage = 'Este email já está sendo utilizado!'
        }
        this.errorMessage = 'Algo deu errado! Tente novamente.'
      })
  }
}
