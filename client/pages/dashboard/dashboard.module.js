import { NgModule } from '@angular/core';
import { DashboardPage } from './dashboard.page';
import { NavModule } from '../../components/common/nav.module';
import { SharedModule } from '../../components/common/shared.module';
import { ProfileModule } from '../profile/profile.module';

@NgModule({
  imports: [
    SharedModule,
    NavModule,
    ProfileModule
  ],
  declarations: [
    DashboardPage
  ],
  exports: [
    DashboardPage
  ]
})
export class DashboardModule {} 
