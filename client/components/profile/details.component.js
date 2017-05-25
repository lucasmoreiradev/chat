'use strict';

import { Component, Input } from '@angular/core'

@Component({
  selector: 'profile-details',
  template: `
    <div class="details">
      <div class="label">
        <span>Nome</span>
      </div>
      <p>{{ user.name }}</p>
    </div>
    <div class="details">
      <div class="label">
        <span>Bio</span>
      </div>
      <p>{{ user.description }}</p>
    </div>
    <div class="connections">
      <p>Você possui 19 conexões</p>
    </div>
  `
})
export class ProfileDetailsComponent {
  @Input() user
}
