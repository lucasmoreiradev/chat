import { NgModule } from '@angular/core'
import { SharedModule } from '../../components/common/shared.module'
import { LoginPage } from './login.page'
import { LoginComponent } from '../../components/account/login.component'

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    LoginPage,
    LoginComponent
  ],
  exports: [
    LoginPage
  ]
})
export class LoginModule {}
