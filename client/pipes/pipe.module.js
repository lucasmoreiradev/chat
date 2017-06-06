'use strict'

import { NgModule } from '@angular/core'
import { LastupdatedPipe } from './lastupdated.pipe'

@NgModule({
  declarations: [
    LastupdatedPipe
  ],
  exports: [
    LastupdatedPipe
  ]
})
export class PipeModule { }
