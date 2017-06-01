'use strict'

import { NgModule } from '@angular/core'
import { SharedModule } from '../../components/common/shared.module'
import { ChatPage } from './chat.page'

@NgModule({
  imports: [ SharedModule ],
  declarations: [
    ChatPage 
  ],
  exports: [
    ChatPage 
  ]
})
export class ChatModule {}
