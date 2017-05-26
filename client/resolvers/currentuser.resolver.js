'use strict'

import { Injectable } from '@angular/core'
import { Resolve } from '@angular/router'
import { Observable } from 'rxjs/Rx'

import { AuthService } from '../services/auth.service'

@Injectable()
export class CurrentUserResolver {
  constructor (auth: AuthService) {
    this.auth = auth
  }
  resolve (route, state) {
    if (!this.auth.currentUser) {
      return this.auth.fetchCurrentUser()
    } else {
      return this.auth.currentUser
    }
  }
}
