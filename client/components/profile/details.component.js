'use strict';

import { Component } from '@angular/core'

@Component({
  selector: 'profile-details',
  template: `
    <div class="details">
      <div class="label">
        <span>Nome</span>
      </div>
      <p>Lucas Moreira</p>
    </div>
    <div class="details">
      <div class="label">
        <span>Bio</span>
      </div>
      <p>Programmer and Gamer</p>
    </div>
    <div class="connections">
      <p>Você possui 19 conexões</p>
    </div>
  `
})
export class ProfileDetailsComponent {}
