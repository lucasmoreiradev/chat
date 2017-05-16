import { Component } from '@angular/core'
// import * as reset from 'eric-meyer-reset.scss/_reset.scss'
// import * as styles from './styles/app.scss'

@Component({
  selector: 'app',
  // styles: [`
    // ${reset}
    // ${styles}
  // `],
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
