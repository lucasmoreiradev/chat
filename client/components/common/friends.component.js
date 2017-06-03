'use strict';

import { Component, Input } from '@angular/core'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { NgFor } from '@angular/common'
import { SocketService } from '../../services/socket.service'
import { ApiService } from '../../services/api.service'
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
                    <span *ngIf="friend.notification" class="notification">!</span>
                  </p>
                  <span class="last-seen">
                    visto por último: {{ friend.active ? 'ativo agora' : friend.updated_at | date: 'MMM dd HH:mm' }} 
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

  constructor (activatedRoute: ActivatedRoute, router: Router, socket: SocketService, api: ApiService) {
    this.router = router
    this.activatedRoute = activatedRoute
    this.socket = socket
    this.api = api
  }
  ngOnInit () {
    this.addListeners()
    this.api.fetch(`messages/unseen/${this.currentUser._id}`)
      .subscribe(messages => {
        if (messages.length > 0) {
          const msg = messages[0]
          let index = findIndex(this.currentUser.friends, friend => friend._id === msg.sender._id)
          msg.sender.notification = true
          this.currentUser.friends[index] = msg.sender 
        }
      })
  }
  handleDm (f) {
    if (f.notification) {
      f.notification = false
      let index = findIndex(this.currentUser.friends, friend => friend._id === f._id)
      this.currentUser.friends[index] = f  
    }
    this.router.navigate([`/chat/${f.username}`])
  }
  addListeners () {
    this.currentUser.friends
      .forEach(({ _id }) => {
        this.socket.sync(`user:${_id}:save`, user => {
          let index = findIndex(this.currentUser.friends, friend => friend._id === user._id)
          this.currentUser.friends[index] = user
        })

        this.socket.sync(`message:${this.currentUser._id}:seen`, message => {
          let index = findIndex(this.currentUser.friends, friend => friend._id === message.sender._id)
          message.sender.notification = false
          this.currentUser.friends[index] = message.sender 
        })

        this.socket.sync(`user:message`, message => {
          if (message.sender._id === _id && !message.seen) {
            let index = findIndex(this.currentUser.friends, friend => friend._id === message.sender._id)
            message.sender.notification = true
            this.currentUser.friends[index] = message.sender 
          }
        })
      })
  }
}
