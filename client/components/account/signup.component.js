'use strict';

import { Component } from '@angular/core'

@Component({
  selector: 'signup',
  template: `
    <form name="signup">
      <h1>Chat Project</h1>
      <div class="name-email">
        <div class="username">
          <label>@Username</label>
          <input type="text">
        </div>
        <div class="email">
          <label>Email</label>
          <input type="email">
        </div>
      </div>
      <label>Senha</label>
      <input type="password">
      <button type="submit">Cadastrar</button>
      <a routerLink="/login">Login</a>
    </form>
  `
})
export class SignupComponent {}
