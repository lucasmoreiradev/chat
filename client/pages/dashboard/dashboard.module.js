import { NgModule } from '@angular/core';
import { DashboardPage } from './dashboard.page';
import { NavModule } from '../../components/common/nav.module';

@NgModule({
  imports: [
    NavModule
  ],
  declarations: [
    DashboardPage
  ],
  exports: [
    DashboardPage
  ]
})
export class DashboardModule {} 
