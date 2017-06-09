'use strict';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { EventService } from '../../services/event.service'
import { ApiService } from '../../services/api.service'
import { SocketService } from '../../services/socket.service'

import * as template from './profile.page.html';

@Component({
  selector: 'profile-page',
  template: `
    ${template}
  `
})
export class ProfilePage {
  constructor (route: ActivatedRoute,
    event: EventService,
    api: ApiService,
    socket: SocketService) {
    this.route = route
    this.event = event
    this.api = api
    this.socket = socket
  }
  ngOnInit () {
    this.friend = false
    this.sub = this.route.data
      .subscribe(({ user, currentUser }) => {
        this.user = user
        this.currentUser = currentUser

        this.api
          .fetch(`requests/pending/${this.user._id}`)
          .subscribe(request => {
            this.request = request
          })

        this.socket.sync(`request:approved`, request => {
          this.friend = true
          this.request = undefined 
        })

        this.socket.sync(`user:${this.user._id}:save`, user => {
          this.user = user
        })

        this.currentUser.friends.forEach(friend => {
          if (friend._id === this.user._id) {
            this.friend = true
          }
        })

        this.socket.sync(`request:${this.user._id}:created`, request => {
          this.request = request
        })

        this.socket.sync(`request:${this.user._id}:declined`, request => {
          this.request = undefined 
        })

        this.socket.sync(`request:${this.user._id}:approved`, request => {
          this.friend = true
          this.request = undefined 
        })
      })
  }
  onChangeAvatar (path) {
    this.event.changeAvatar(path)
    this.user.avatar_url = path
  }
  ngOnDestroy () {
    this.sub.unsubscribe() 
    this.socket.unsync(`user:${this.user._id}:save`)
    this.socket.unsync(`request:${this.user._id}:declined`)
    this.socket.unsync(`request:approved`)
  }
  shouldHide (toCompare) {
    return !toCompare 
  }
}
