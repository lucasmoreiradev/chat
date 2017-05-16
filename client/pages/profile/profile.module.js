'use strict';

import { NgModule } from '@angular/core';
import { SharedModule } from '../../components/common/shared.module';
import { ProfilePage } from './profile.page';

@NgModule({
  imports: [ SharedModule ],
  declarations: [
    ProfilePage
  ],
  exports: [
    ProfilePage
  ]
})
export class ProfileModule {}
