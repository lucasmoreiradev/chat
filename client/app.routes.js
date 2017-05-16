import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardModule } from './pages/dashboard/dashboard.module';

// Main pages
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { ProfilePage } from './pages/profile/profile.page';

export const routes = [
  {
    path: '',
    component: DashboardPage
  },
  {
    path: 'profile',
    component: ProfilePage
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    DashboardModule
  ],
  providers: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
