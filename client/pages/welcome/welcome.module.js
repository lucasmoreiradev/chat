import { NgModule } from '@angular/core'
import { WelcomePage } from './welcome.page'
import { SharedModule } from '../../components/common/shared.module'

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    WelcomePage
  ],
  exports: [
    WelcomePage
  ]
})
export class WelcomeModule {}
