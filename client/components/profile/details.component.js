'use strict';

import { Component, Input } from '@angular/core'
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
      <div class="detail">
        <div class="label">
          <span>Bio</span>
        </div>
        <p>{{ user.description }}</p>
      </div>
      <div class="detail">
        <p *ngIf="!editable">{{ user.username }} possui 19 conexões</p>
        <p *ngIf="editable"> Você possui 19 conexões</p>
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
}
