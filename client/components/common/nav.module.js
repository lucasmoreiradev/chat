'use strict';

import { NgModule } from '@angular/core';
import { NavComponent } from './nav.component';
import { SearchComponent } from '../search/search.component';
import { SharedModule } from './shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    NavComponent,
    SearchComponent
  ],
  exports: [
    NavComponent
  ]
})
export class NavModule {}
