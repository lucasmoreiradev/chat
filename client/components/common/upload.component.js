'use strict'

import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ApiService } from '../../services/api.service'

@Component({
  selector: 'upload',
  template: `
    <input type="file" [accept]="allowed" #file (change)="handleFile(file.files[0])" /> 
  `
})
export class UploadComponent {
  @Input() kind
  @Input() allowed
  @Output() path = new EventEmitter()

  constructor (api: ApiService) {
    this.api = api
  }
  handleFile (file) {
    if (!file) return 

    this.path.emit(null)

    let reader = new FileReader()
    reader.onload = (e) => {
      this.api.upload(`uploads/${this.kind}`, e.target.result)
        .subscribe(
          url => this.path.emit(url.path),
          err => console.log(err)
        )
    }
    reader.readAsDataURL(file)
  }
}
