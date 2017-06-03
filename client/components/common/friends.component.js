'use strict';

import { Component, Input } from '@angular/core'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
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
              <div class="friend" (click)="handleDm(friend)">
                <img [src]="friend.avatar_url" [class]="friend.active ? 'active' : 'inactive'">
                <div class="info">
                  <p [class]="friend.active ? 'active' : 'inactive'">
                    @{{ friend.username }}
                    <span *ngIf="friend.has_unread_message" class="notification">!</span>
                  </p>
                  <span class="last-seen">
                    visto por último: {{ friend.active ? 'ativo agora' : friend.update_at | date: 'MMM dd HH:mm' }} 
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

  constructor (activatedRoute: ActivatedRoute, router: Router) {
    this.router = router
    this.activatedRoute = activatedRoute
  }
  handleDm (friend) {
    this.router.navigate([`/chat/${friend.username}`])
  }
}
