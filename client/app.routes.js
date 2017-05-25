import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { LoginModule } from './pages/login/login.module';
import { SignupModule } from './pages/signup/signup.module';

import { UserResolver } from './resolvers/user.resolver'

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
        path: 'profile/:username',
        component: ProfilePage,
        resolve: {
          user: UserResolver
        }
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
  providers: [
    UserResolver
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
