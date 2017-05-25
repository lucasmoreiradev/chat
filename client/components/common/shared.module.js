'use strict';

import { NgModule } from '@angular/core';
import { FriendsComponent } from './friends.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'

@NgModule({
  imports: [
    RouterModule,
    FormsModule,
    CommonModule
  ],
  declarations: [
    FriendsComponent
  ],
  exports: [
    FriendsComponent,
    RouterModule,
    FormsModule,
    CommonModule
  ]
})
export class SharedModule {}
