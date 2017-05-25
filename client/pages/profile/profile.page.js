'use strict';

import { Component, ngOnInit } from '@angular/core';
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
    console.log(route)
    this.route = route
  }
  ngOnInit () {
    this.route.data
      .subscribe({ user }) => {
        console.log(user)
      }
  }
}
