'use strict'

import { Component } from '@angular/core'

@Component({
  selector: 'login',
  template: `
    <form name="login">
      <h1>Chat Project</h1>
      <label>Email</label>
      <input type="email">
      <label>Senha</label>
      <input type="password">
      <button type="submit">Entrar</button>
      <a routerLink="/signup">Cadastre-se</a>
    </form>
  `
})
export class LoginComponent {}
