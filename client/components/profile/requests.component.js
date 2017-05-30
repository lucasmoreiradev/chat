'use strict'

import { Component, Input } from '@angular/core'
import { NgIf } from '@angular/common'
import { ApiService } from '../../services/api.service'

@Component({
  selector: 'requests',
  template: `
    <div class="requests" *ngIf="request && user._id !== currentUser._id">
      <button *ngIf="request && !request._id && !user.friend" class="request-btn" (click)="sendRequest()">Adicionar amigo</button>
      <p *ngIf="request && request._id" class="waiting">Aguardando aprovação...</p>
    </div>
    <div class="requests" *ngIf="request && request.id_requester === user._id">
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

  constructor (api: ApiService) {
    this.api = api
  }
  sendRequest () {
    const request = {
      id_requester: this.currentUser._id,
      id_requested: this.user._id,
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
        if (request.approved) {
          //socket
          this.request = request
        } else {
          //socket
          this.request = {}
        }
      })
      .catch(err => console.log(err))
  }
}
