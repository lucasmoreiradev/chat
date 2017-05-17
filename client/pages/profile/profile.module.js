'use strict';

import { NgModule } from '@angular/core';
import { SharedModule } from '../../components/common/shared.module';
import { ProfilePage } from './profile.page';
import { ProfileDetailsComponent } from '../../components/profile/details.component';

@NgModule({
  imports: [ SharedModule ],
  declarations: [
    ProfilePage,
    ProfileDetailsComponent
  ],
  exports: [
    ProfilePage
  ]
})
export class ProfileModule {}
