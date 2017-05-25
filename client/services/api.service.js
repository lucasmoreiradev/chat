import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions } from '@angular/http'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'

const apiURL = '/api'

@Injectable()
export class ApiService {
  constructor (http: Http) {
    this.http = http

    let headers = new Headers({ 'Content-Type': 'application/json' })
    this.options = new RequestOptions({ headers: headers })
  }
  fetch (endpoint) {
    return this.http.get(`${apiURL}/${endpoint}`, this.options)
      .map(res => res.json())
  }
  fetchProject (id) {
    return this.http.get(`${apiURL}/projects/${id}`, this.options)
      .map(res => res.json())
      .do(val => this.project = val)
  }
  create (endpoint, data) {
    return new Promise((resolve, reject) => {
      this.http.post(`${apiURL}/${endpoint}`, JSON.stringify(data), this.options)
      .subscribe(
        data => {
          resolve(data.json())
        },
        err => {
          reject(err)
        })
    })
  }
  update (endpoint, data) {
    return new Promise((resolve, reject) => {
      this.http.put(`${apiURL}/${endpoint}`, JSON.stringify(data), this.options)
      .subscribe(
        data => {
          resolve(data.json())
        },
        err => {
          reject(err)
        })
    })
  }
  upload (endpoint, data) {
    const headers = new Headers({
      'Content-Type': 'application/octect-stream'
    })
    const options = new RequestOptions({ headers: headers })

    return this.http.post(`${apiURL}/${endpoint}`, JSON.stringify(data), options)
      .map(res => res.json())
  }
  logError (err) {
    console.log('There was an error: ' + err)
  }
}

