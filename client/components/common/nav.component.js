'use strict';

import { Component } from '@angular/core';
import { SearchComponent } from '../search/search.component'

@Component({
  selector: 'navigation',
  template: `
    <nav>
      <a>
        <h3>Chat</h3>
      </a>
      <div class="search-bar">
        <search></search>
      </div>
      <div class="controls">
        <a class="perfil">Perfil</a>
        <a class="logout">Logout</a>
      </div>
    </nav>
  `
})
export class NavComponent {}
