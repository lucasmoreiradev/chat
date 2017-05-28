'use strict';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { EventService } from '../../services/event.service'

import * as template from './profile.page.html';

@Component({
  selector: 'profile-page',
  template: `
    ${template}
  `
})
export class ProfilePage {
  constructor (route: ActivatedRoute, event: EventService) {
    this.route = route
    this.event = event
  }
  ngOnInit () {
    this.sub = this.route.data
      .subscribe(({ user }) => {
        this.user = user
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
