'use strict';

import { NgModule } from '@angular/core';
import { NavComponent } from './nav.component';
import { SearchComponent } from '../search/search.component';

@NgModule({
  imports: [],
  declarations: [
    NavComponent,
    SearchComponent
  ],
  exports: [
    NavComponent
  ]
})
export class NavModule {}
