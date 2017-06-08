import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { LoginModule } from './pages/login/login.module';
import { SignupModule } from './pages/signup/signup.module';
import { ChatModule } from './pages/chat/chat.module'
import { WelcomeModule } from './pages/welcome/welcome.module'

import { UserResolver } from './resolvers/user.resolver'
import { CurrentUserResolver } from './resolvers/currentuser.resolver'

// Main pages
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { ProfilePage } from './pages/profile/profile.page';
import { LoginPage } from './pages/login/login.page';
import { SignupPage } from './pages/signup/signup.page';
import { ChatPage } from './pages/chat/chat.page'
import { WelcomePage } from './pages/welcome/welcome.page'

export const routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: 'welcome',
        component: WelcomePage
      },
      {
        path: 'profile/:username',
        component: ProfilePage,
        resolve: {
          user: UserResolver,
          currentUser: CurrentUserResolver
        }
      },
      {
        path: 'chat/:username',
        component: ChatPage,
        resolve: {
          user: UserResolver,
          currentUser: CurrentUserResolver
        }
      }
    ],
    resolve: {
      currentUser: CurrentUserResolver
    }
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
    SignupModule,
    ChatModule,
    WelcomeModule
  ],
  providers: [
    UserResolver,
    CurrentUserResolver
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
