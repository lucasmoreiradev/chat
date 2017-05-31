'use strict';

import { Component, Input } from '@angular/core'
import { ActivatedRoute, RouterLink } from '@angular/router'
import { NgFor } from '@angular/common'

@Component({
  selector: 'friends',
  template: `
    <div class="friends-container">
      <div class="friends">
        <span [style.display]="block">
          Fale com seus amigos abaixo:
        </span>
          <ul>
            <li *ngFor="let friend of currentUser.friends">
              <div class="friend">
                <img [src]="friend.avatar_url">
                <div class="info">
                  <p>
                    @{{ friend.username }}
                  </p>
                  <span class="last-seen">
                    visto por último: 10/10/2010 10:10:10
                  </span>
                </div>
              </div>
            </li>
          </ul>
      </div>
    </div>
  `
})
export class FriendsComponent {
  @Input() currentUser

  constructor (route: ActivatedRoute) {
    this.route = route
  }
}
