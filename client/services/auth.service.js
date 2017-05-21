import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/do'

@Injectable()
export class AuthService {
  constructor (http: Http) {
    this.http = http

    let headers = new Headers({ 'Content-Type': 'application/json' })
    this.options = new RequestOptions({ headers: headers })
  }
  signup (creds) {
    return new Promise((resolve, reject) => {
      this.http.post('/signup', JSON.stringify(creds), this.options)
      .subscribe(
        data => {
          resolve(data.json())
        },
        err => {
          reject(err)
        }
      )
    })
  }
  login (creds) {
    return new Promise((resolve, reject) => {
      this.http.post('/login', JSON.stringify(creds), this.options)
      .subscribe(
        data => {
          localStorage.setItem('id_token', data.json().token)
          resolve(data.json())
        },
        err => {
          reject(err)
        }
      )
    })
  }
  validate (handle) {
    return new Promise((resolve, reject) => {
      this.http.get(`/api/users/validate/${handle}`)
      .subscribe(
        data => {
          resolve(data.json())
        },
        err => {
          reject(err)
        })
    })
  }
  fetchCurrentUser () {
    return this.http.get('/api/users/me', this.options)
      .map(res => res.json())
      .do(val => this.currentUser = val)
  }
}

