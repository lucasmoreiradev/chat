'use strict';

import { Component, Input } from '@angular/core'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { NgFor } from '@angular/common'
import { SocketService } from '../../services/socket.service'
import * as findIndex from 'lodash/findIndex'

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

  constructor (activatedRoute: ActivatedRoute, router: Router, socket: SocketService) {
    this.router = router
    this.activatedRoute = activatedRoute
    this.socket = socket
  }
  ngOnInit () {
    this.addListeners()
  }
  handleDm (friend) {
    this.router.navigate([`/chat/${friend.username}`])
  }
  addListeners () {
    this.currentUser.friends
      .forEach(({ _id }) => {
        this.socket.sync(`user:${_id}:save`, user => {
          let index = findIndex(this.currentUser.friends, friend => friend._id === user._id)
          this.currentUser.friends[index] = user
        })
      })
  }
}
