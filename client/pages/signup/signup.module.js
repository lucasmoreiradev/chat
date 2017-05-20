import { NgModule } from '@angular/core'
import { SignupPage } from './signup.page'
import { SignupComponent } from '../../components/account/signup.component'
import { SharedModule } from '../../components/common/shared.module'

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    SignupPage,
    SignupComponent
  ],
  exports: [
    SignupPage
  ]
})
export class SignupModule {}
