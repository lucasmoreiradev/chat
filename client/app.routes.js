import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { LoginModule } from './pages/login/login.module';
import { SignupModule } from './pages/signup/signup.module';

// Main pages
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { ProfilePage } from './pages/profile/profile.page';
import { LoginPage } from './pages/login/login.page';
import { SignupPage } from './pages/signup/signup.page';

export const routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: 'profile',
        component: ProfilePage
      }
    ]
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'signup',
    component: SignupPage 
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    DashboardModule,
    LoginModule,
    SignupModule
  ],
  providers: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
