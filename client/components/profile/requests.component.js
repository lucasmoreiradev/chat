'use strict'

import { Component, Input } from '@angular/core'
import { NgIf } from '@angular/common'
import { ApiService } from '../../services/api.service'

@Component({
  selector: 'requests',
  template: `
    <div class="requests" *ngIf="user._id !== currentUser._id">
      <button *ngIf="!request && !friend" class="request-btn" (click)="sendRequest()">Adicionar amigo</button>
      <p *ngIf="request" class="waiting">Aguardando aprovação...</p>
    </div>
    <div class="requests" *ngIf="request && request.requested === currentUser._id">
      <button class="accept" (click)="handleApproval(true)">
        Aceitar solicitação de amizade de @{{ user.username }}
      </button>
      <button class="decline" (click)="handleApproval(false)">
        Recusar
      </button>
    </div>
  `
})
export class RequestsComponent {
  @Input() user
  @Input() currentUser
  @Input() request
  @Input() friend

  constructor (api: ApiService) {
    this.api = api
  }
  sendRequest () {
    const request = {
      requester: this.currentUser,
      requested: this.user,
    }
    this.api.create('requests', request)
      .then(request => {
        this.request = request
      })
      .catch(err => console.log(err))
  }
  handleApproval (approved) {
    this.api.update(`requests/${this.request._id}`, { approved: approved })
      .then(request => {
        this.request = undefined
        this.friend = request.approved
      })
      .catch(err => console.log(err))
  }
}
