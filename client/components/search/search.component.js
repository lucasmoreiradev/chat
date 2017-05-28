'use strict';

import { Component, OnInit, Input } from '@angular/core';
import { NgIf } from '@angular/common'
import { FormControl } from '@angular/forms'
import { ApiService } from '../../services/api.service'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/distinctUntilChanged'

@Component({
  selector: 'search',
  template: `
    <form name="search-bar">
      <input type="search" autocomplete="off" name="search"
        placeholder="Procure por pessoas"
        [formControl]="term" [(ngModel)]="model.term">
    </form>
    <div class="elastic-dropdown" (click)="model = {}" *ngIf="model.term">
      <div class="fetching" *ngIf="fetching">
        <figure class="loader"></figure>
        <p>Procurando por usuários...</p>
      </div>
      <div class="results" *ngIf="results">
        <div class="result" *ngFor="let result of results">
          <a class="name" routerLink="/profile/{{ result.username }}">
            <img [src]="result.avatar_url">
            <p>{{ result.username }}</p>
          </a>
          <div class="info">
            {{ result.description }}
          </div>
        </div>
      </div>
    </div>
  `
})
export class SearchComponent {
  @Input() currentUser
  term = new FormControl()

  constructor (api: ApiService) {
    this.api = api
  }
  ngOnInit () {
    this.model = {}
    this.term.valueChanges
      .do(() => this.results = null)
      .debounceTime(600)
      .distinctUntilChanged()
      .subscribe(term => {
        if (!term) {
          return this.results = null
        }

        this.fetching = true
        this.api.fetch(`users/search?term=${term}`)
          .subscribe(results => {
            this.fetching = false
            this.results = results
          }, err => console.log(err))
      })
  }
}
