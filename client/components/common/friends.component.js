'use strict';

import { Component } from '@angular/core';


@Component({
  selector: 'friends',
  template: `
    <div class="friends-container">
      <div class="friends">
        <span [style.display]="block">
          Fale com seus amigos abaixo:
        </span>
      </div>
    </div>
  `
})
export class FriendsComponent {}
