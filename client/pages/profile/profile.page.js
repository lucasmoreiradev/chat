'use strict';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import * as template from './profile.page.html';

@Component({
  selector: 'profile-page',
  template: `
    ${template}
  `
})
export class ProfilePage {
  constructor (route: ActivatedRoute) {
    this.route = route
  }
  ngOnInit () {
    this.sub = this.route.data
      .subscribe(({ user }) => {
        this.user = user
    })
  }
  ngOnDestroy () {
    this.sub.unsubscribe() 
  }
}
