'use strict';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavComponent } from '../../components/common/nav.component';

@Component({
  template: `
    <navigation></navigation>
    <div class="container">
      <friends></friends>
      <router-outlet class="child-views"></router-outlet>
    </div>
  `
})

export class DashboardPage {} 
