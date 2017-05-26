'use strict'

import { Component, Input } from '@angular/core'
import { SearchComponent } from '../search/search.component'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'navigation',
  template: `
    <nav>
      <a routerLink="/">
        <h3>Chat</h3>
      </a>
      <div class="search-bar">
        <search></search>
      </div>
      <div class="controls">
        <a routerLink="/profile/{{ currentUser.username }}" class="perfil">
          Profile
        </a>
        <a class="logout">Logout</a>
      </div>
    </nav>
  `
})
export class NavComponent {
  @Input() currentUser
}
