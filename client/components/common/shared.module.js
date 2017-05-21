'use strict';

import { NgModule } from '@angular/core';
import { FriendsComponent } from './friends.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'

@NgModule({
  imports: [
    RouterModule
  ],
  declarations: [
    FriendsComponent
  ],
  exports: [
    FriendsComponent,
    RouterModule,
    FormsModule
  ]
})
export class SharedModule {}
