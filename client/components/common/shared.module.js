'use strict'

import { NgModule } from '@angular/core'
import { FriendsComponent } from './friends.component'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { UploadComponent } from './upload.component' 
import { PipeModule } from '../../pipes/pipe.module'

@NgModule({
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    PipeModule
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
    UploadComponent,
    PipeModule
  ]
})
export class SharedModule {}
