'use strict'

import { Injectable } from '@angular/core'
import { Subject } from 'rxjs/Subject'

@Injectable()
export class EventService {
  _changeAvatarSource = new Subject()

  avatarChanged$ = this._changeAvatarSource.asObservable()

  changeAvatar (avatar) {
    this._changeAvatarSource.next(avatar) 
  }
}


