'use strict';

import { Component, Input, OnInit } from '@angular/core'
import { NgIf } from '@angular/common'
import { ApiService } from '../../services/api.service'

@Component({
  selector: 'profile-details',
  template: `
    <div class="details" [style.display]="!editing ? 'block' : 'none'">
      <div class="detail">
        <div class="label">
          <span>@Username</span>
        </div>
        <p>{{ user.username }}</p>
      </div>
      <div class="detail" *ngIf="user.description">
        <div class="label">
          <span>Bio</span>
        </div>
        <p>{{ user.description }}</p>
      </div>
      <div class="detail">
        <p>{{ msg }}</p>
      </div>
    </div>
    <form class="editor" name="profile" [hidden]="!editing">
      <label>Descrição/Bio</label>
      <textarea rows="10" cols="100" name="description" [(ngModel)]="user.description">
      </textarea>
      <button type="submit" class="saving" (click)="saveEdit()">
        Salvar 
      </button>
    </form>
    <button class="editing" (click)="toggleEditing()"
      *ngIf="!editing && editable">
      Editar
    </button>
  `
})
export class ProfileDetailsComponent {
  @Input() user
  @Input() editable 

  constructor (api: ApiService) {
    this.api = api
    this.msg = ''
  }

  ngOnInit () {
    this.defineMessageConnections()
  }
  saveEdit () {
    this.api.update(`users/${this.user._id}`, this.user)
      .then(user => {
        this.editing = false
      }).catch(err => console.log(err))
  }
  toggleEditing () {
    this.editing = true
  }
  defineMessageConnections () {
    let user = ''
    if (this.editable) {
      user = 'Você'
    } else {
      user = this.user.username
    }

    if (this.user.friends.length !== 0) {
      if (this.user.friends.length > 1) {
        this.msg = `${user} possui ${this.user.friends.length} amigos adicionados 😎`
      } else {
        this.msg = `${user} possui apenas um amigo adicionado!`
      }
    } else {
      this.msg = `${user} é novo por aqui.. não tem amigos adicionados ainda!`
    }
  }
}
