import { Component } from '@angular/core'
import * as reset from 'eric-meyer-reset.scss/_reset.scss'
import * as styles from './styles/app.scss'

@Component({
  selector: 'app',
   styles: [`
     ${reset}
     ${styles}
   `],
  template: `
    <ng-progress [showSpinner]="false" color="#5EF38C"
                 direction="leftToRightIncreased"
                 positionUsing="translate">
    </ng-progress>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
