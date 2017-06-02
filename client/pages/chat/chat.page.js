'use strict'

import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core'
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
  @ViewChild('directMessages') messagesEl
  @ViewChild('textarea') textareaEl

  constructor (api: ApiService, route: ActivatedRoute, socket: SocketService, cdr: ChangeDetectorRef) {
    this.api = api
    this.route = route
    this.socket = socket
    this.cdr = cdr
  }
  ngOnInit () {
    this.sub = this.route.data
      .subscribe(({ user, currentUser }) => {
        this.user = user
        this.currentUser = currentUser
      })

    this.api.update(`messages/see/${this.user._id}`, { seen: true })
      .catch(err => console.log(err))

    this.api.fetch(`messages/direct/${this.user._id}`)
      .subscribe(messages => {
        this.messages = messages
        this.handleScroll()
      })

    this.socket.sync(`message:${this.user._id}`, message => {
      this.messages.push(message)
      this.handleScroll()

      this.api.update(`messages/seen/${message._id}`, { seen: true })
        .catch(err => console.log(err))
    })

    this.message = {}
  }
  ngAfterViewInit() {
    this.textareaEl.nativeElement.focus()
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
        this.handleScroll()
      }).catch(err => console.log(err))
  }
  ngOnDestroy () {
    this.sub.unsubscribe()
    this.socket.unsync(`message:${this.user._id}`)
  }
  handleMessage (event) {
    if (event.keyCode === 13) {
      this.sendMessage()
    }
  }
  handleScroll () {
    this.cdr.detectChanges()
    this.messagesEl.nativeElement.scrollTop = 
      this.messagesEl.nativeElement.scrollHeight
  }
}
