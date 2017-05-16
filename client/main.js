import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { enableProdMode } from '@angular/core'
import { AppModule } from './app.module'

if (__PROD__) {
  enableProdMode()
}

const platform = platformBrowserDynamic()
platform.bootstrapModule(AppModule)

if (module.hot) {
  module.hot.accept()
}
