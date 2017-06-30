'use strict'

import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { NavComponent } from '../../components/common/nav.component'

@Component({
  template: `
    <navigation [currentUser]="currentUser"></navigation>
    <div class="container">
      <friends [currentUser]="currentUser"></friends>
      <router-outlet class="child-views"></router-outlet>
    </div>
  `
})

export class DashboardPage {
  constructor (activatedRoute: ActivatedRoute, route: Router) {
    this.activatedRoute = activatedRoute 
    this.route = route
  }
  ngOnInit () {
    this.route.navigate(['/welcome'])
    this.sub = this.activatedRoute.data
      .subscribe(({ currentUser }) => this.currentUser = currentUser)
  }
  ngOnDestroy () {
    this.sub.unsubscribe()
  }
} 
