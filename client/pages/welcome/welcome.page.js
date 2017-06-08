import { Component } from '@angular/core'
import * as template from './welcome.page.html'

@Component({
  selector: 'welcome-page',
  template: `
    ${template}
  `
})
export class WelcomePage {}
