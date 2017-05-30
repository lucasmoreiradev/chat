'use strict';

import { NgModule } from '@angular/core';
import { SharedModule } from '../../components/common/shared.module'
import { ProfilePage } from './profile.page'
import { ProfileDetailsComponent } from '../../components/profile/details.component'
import { RequestsComponent } from '../../components/profile/requests.component'

@NgModule({
  imports: [ SharedModule ],
  declarations: [
    ProfilePage,
    ProfileDetailsComponent,
    RequestsComponent
  ],
  exports: [
    ProfilePage
  ]
})
export class ProfileModule {}
