'use strict';

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { NavComponent } from './nav.component';
import { SearchComponent } from '../search/search.component';
import { SharedModule } from './shared.module';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule
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
