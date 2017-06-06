'use strict'

import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'lastupdated' })
export class LastupdatedPipe implements PipeTransform {
  transform (values) {
    return values.sort((a, b) => {
      if (b.active || a.active) {
        return b.active - a.active
      } else {
        return b.updated_at > a.updated_at
      }
    })
  }
}
