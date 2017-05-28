'use strict'

import { NgModule } from '@angular/core'
import { FriendsComponent } from './friends.component'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { UploadComponent } from './upload.component' 

@NgModule({
  imports: [
    RouterModule,
    FormsModule,
    CommonModule
  ],
  declarations: [
    FriendsComponent,
    UploadComponent
  ],
  exports: [
    FriendsComponent,
    RouterModule,
    FormsModule,
    CommonModule,
    UploadComponent
  ]
})
export class SharedModule {}
