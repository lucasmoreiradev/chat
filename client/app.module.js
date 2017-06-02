import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app.routes'
import { AuthService } from './services/auth.service'
import { ApiService } from './services/api.service'
import { EventService } from './services/event.service'
import { SocketService } from './services/socket.service'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    EventService,
    AuthService,
    ApiService,
    SocketService
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
