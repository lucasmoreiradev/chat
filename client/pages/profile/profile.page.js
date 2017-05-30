'use strict';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { EventService } from '../../services/event.service'
import { ApiService } from '../../services/api.service'

import * as template from './profile.page.html';

@Component({
  selector: 'profile-page',
  template: `
    ${template}
  `
})
export class ProfilePage {
  constructor (route: ActivatedRoute, event: EventService, api: ApiService) {
    this.route = route
    this.event = event
    this.api = api
  }
  ngOnInit () {
    this.sub = this.route.data
      .subscribe(({ user, currentUser }) => {
        this.user = user
        this.currentUser = currentUser
    })

    this.api
      .fetch(`requests/pending/${this.user._id}`)
      .subscribe(request => {
        this.request = request || {}
      })

    this.currentUser.friends.forEach(id_friend => {
      if (id_friend === this.user._id) {
        this.user.friend = true
      }
    })
  }
  onChangeAvatar (path) {
    this.event.changeAvatar(path)
    this.user.avatar_url = path
  }
  ngOnDestroy () {
    this.sub.unsubscribe() 
  }
  shouldHide (toCompare) {
    return !toCompare 
  }
}
