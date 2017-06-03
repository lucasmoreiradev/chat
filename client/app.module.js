import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpModule, BrowserXhr } from '@angular/http'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app.routes'
import { AuthService } from './services/auth.service'
import { ApiService } from './services/api.service'
import { EventService } from './services/event.service'
import { SocketService } from './services/socket.service'
import { NgProgressModule, NgProgressCustomBrowserXhr } from 'ng2-progressbar'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgProgressModule
  ],
  providers: [
    EventService,
    AuthService,
    ApiService,
    SocketService,
    { provide: BrowserXhr, useClass: NgProgressCustomBrowserXhr } 
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
