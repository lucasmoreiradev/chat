'use strict'

import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ApiService } from '../../services/api.service'
import { SocketService } from '../../services/socket.service'

import * as template from './chat.page.html'

@Component({
  selector: 'chat-page',
  template: `
    ${template}
  `
})
export class ChatPage {
  constructor (api: ApiService, route: ActivatedRoute, socket: SocketService) {
    this.api = api
    this.route = route
    this.socket = socket
  }
  ngOnInit () {
    this.sub = this.route.data
      .subscribe(({ user, currentUser }) => {
        this.user = user
        this.currentUser = currentUser
      })

    this.api
      .fetch(`messages/direct/${this.user._id}`)
      .subscribe(messages => {
        this.messages = messages
      })

    this.socket.sync(`message:${this.user._id}`, message => {
      this.messages.push(message)
    })

    this.message = {}
  }
  sendMessage () {
    const message = {
      receipend: this.user._id,
      sender: this.currentUser._id,
      text: this.message.text
    }

    this.api.create(`messages`, message)
      .then(message => {
        message.sender = this.currentUser
        this.message.text = null
        this.messages.push(message)
      }).catch(err => console.log(err))
  }
  ngOnDestroy () {
    this.sub.unsubscribe()
  }
}
