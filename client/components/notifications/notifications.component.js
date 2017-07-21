'use strict'

import { Component } from '@angular/core'
import { NgIf, NgFor } from '@angular/common'
import { ApiService } from '../../services/api.service'
import { SocketService } from '../../services/socket.service'
import { ActivatedRoute } from '@angular/router'
import * as findIndex from 'lodash/findIndex'

@Component({
  selector: 'notifications',
  template: `
    <a (click)="viewing = !viewing">
      <img src="http://res.cloudinary.com/dvko3bggq/image/upload/v1497498167/alarm_1_cmrimg.png">
      <span *ngIf="requests.length > 0" class="qtd-notifications">{{ requests.length }}</span>
    </a>
    <div class="dropdown" *ngIf="viewing && requests.length > 0">
      <div *ngFor="let request of requests">
        <div class="row">
         <a (click)="viewing = false" routerLink="/profile/{{ request.requester.username }}">
            <img [src]="request.requester.avatar_url">
            <span>{{ request.requester.username }} solicitou sua amizade</span>
          </a>         
        </div>
      </div>
    </div>
  `
})
export class NotificationsComponent {
  requests = []

  constructor (api: ApiService, route: ActivatedRoute, socket: SocketService) {
    this.api = api
    this.route = route 
    this.socket = socket
  }
  ngOnInit () {
    this.sub = this.route.data
      .subscribe(({ currentUser }) => this.currentUser = currentUser)

    this.api.fetch(`requests/pending/me`)
      .subscribe(requests => {
        if (requests) {
          requests.forEach(req => {
            if (req.requested === this.currentUser._id) {
              this.requests.push(req)
            }
          })
        }
      })

    this.socket.sync(`request:created`, request => {
      this.api.fetch(`requests/${request._id}`)
        .subscribe(req => {
          this.requests.push(req)
        })
    })
    this.socket.sync(`request:approved`, request => {
      let index = findIndex(this.requests, req => req._id === request._id)
      this.requests.splice(index, 1)
      this.viewing = false
    })
    this.socket.sync(`request:declined`, request => {
      let index = findIndex(this.requests, req => req._id === request._id)
      this.requests.splice(index, 1) 
      this.viewing = false
    })
  }
  ngOnDestroy () {
    this.sub.unsubscribe()
  }
}
