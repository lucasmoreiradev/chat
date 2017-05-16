'use strict';

import { NgModule } from '@angular/core';
import { FriendsComponent } from './friends.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule
  ],
  declarations: [
    FriendsComponent
  ],
  exports: [
    FriendsComponent,
    RouterModule
  ]
})
export class SharedModule {}
