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
    this.sub = this.route.data
      .subscribe(({ user, currentUser }) => {
        this.user = user
        this.currentUser = currentUser

        this.api
          .fetch(`requests/pending/${this.user._id}`)
          .subscribe(request => {
            this.request = request || {}
          })

        this.currentUser.friends.forEach(friend => {
          if (friend._id === this.user._id) {
            this.user.friend = true
          }
        })

        this.socket.sync(`user:${this.user._id}:save`, user => {
          console.log('ae')
          this.user = user
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
  }
  shouldHide (toCompare) {
    return !toCompare 
  }
}
