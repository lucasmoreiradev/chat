import { Injectable } from '@angular/core'
import * as io from 'socket.io-client'

@Injectable()
export class SocketService {
  constructor () {
    this.socket = io.connect('', {'transports': ['websocket', 'polling']})
    if (module.hot) {
      module.hot.dispose(() => this.socket.disconnect())
    }
  }
  emit (evt, payload) {
    this.socket.emit(evt, payload)
  }
  sync (evt, cb) {
    this.socket.on(evt, (payload) => {
      cb(payload)
    })
  }
  unsync (evt) {
    this.socket.removeListener(evt)
  }
  unsyncAll () {
    this.socket.removeAllListeners()
  }
  join (room) {
    this.socket.emit('join', room)
  }
  leave (room) {
    this.socket.emit('leave', room)
  }
}

