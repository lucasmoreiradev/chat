'use strict'

import { Injectable } from '@angular/core'
import { Resolve } from '@angular/router'
import { Observable } from 'rxjs/Rx'
import { ApiService } from '../services/api.service'

@Injectable()
export class UserResolver {
  constructor (api: ApiService) {
    this.api = api
  }
  resolve (route, state) {
    return this.api.fetch(`users/${route.params.username}`)
  }
}
