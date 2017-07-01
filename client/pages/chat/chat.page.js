'use strict'

import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ApiService } from '../../services/api.service'
import { SocketService } from '../../services/socket.service'
import * as map from 'lodash/map'
import * as Buzz from 'node-buzz'

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
    this.alert = new Buzz.sound(
      '/assets/sounds/message.mp3',
      { preload: true }
    )
  }
  ngOnInit () {
    this.sub = this.route.data
      .subscribe(({ user, currentUser }) => {
        this.typing = false
        this.user = user
        this.currentUser = currentUser

        this.stopForEach = false
        this.currentUser.friends.forEach(friend => {
          if (!this.stopForEach) {
            if (friend._id === this.user._id) {
              this.friend = true
              this.stopForEach = true
            } else {
              this.friend = false
            }
          }
        })

        this.api.update(`messages/see/${this.user._id}`, { seen: true })
          .catch(err => console.log(err))

        this.api.fetch(`messages/direct/${this.user._id}`)
          .subscribe(messages => {
            this.messages = messages
            this.handleScroll()
          })

        this.socket.sync(`message:${this.user._id}`, message => {
          this.alert.play()
          this.messages.push(message)
          this.handleScroll()
          this.typing = false
          this.api.update(`messages/seen/${message._id}`, { seen: true })
            .catch(err => console.log(err))
        })

        this.socket.sync(`message:${this.user._id}:seen`, message => {
          message.sender = this.user
          map(this.messages, (m,i) => {
            if (m._id === message._id) {
              return this.messages[i].seen = message.seen
            }
          })
        })

        this.socket.sync(`user:${this.user._id}:typing`, isTyping => {
          this.typing = isTyping
        })

        this.socket.sync(`user:${this.user._id}:save`, user => {
          if (!user.active) {
            this.typing = false
          }
        })
      })

    this.message = {}
  }
  handleTyping (event) {
    this.socket.emit(`user:${this.currentUser._id}:typing`, { 
      to: this.user._id,
      isTyping: event.length > 0 
    })
  }
  ngAfterViewInit() {
    this.textareaEl.nativeElement.focus()
  }
  sendMessage () {
    if (!this.friend) {
      let text = `Oooops... você não possui o ${this.user.username} adicionado! Adicione-o para conversar com ele. 🕶`
      if (this.currentUser._id === this.user._id) {
        text = `Você não pode enviar uma mensagem para si mesmo, ${this.currentUser.username}! 😕`
      }
      const message = {
        sender: {
          username: 'ChatBot',
          avatar_url: 'https://www.theweakestlink.es/wp-content/uploads/2017/04/bot-de-telegram.jpg'
        },
        text: text,
        created_at: new Date()
      }
      this.messages.push(message)
    } else {
      const message = {
        receipent: this.user._id,
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
  }
  ngOnDestroy () {
    this.sub.unsubscribe()
    this.socket.unsync(`message:${this.user._id}`)
    this.socket.unsync(`message:${this.user._id}:seen`)
  }
  handleMessage (event) {
    if (event.keyCode === 13 && this.message.text) {
      this.sendMessage()
    }
  }
  handleScroll () {
    this.cdr.detectChanges()
    this.messagesEl.nativeElement.scrollTop =
      this.messagesEl.nativeElement.scrollHeight
  }
}
