import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';
import { ClientComponent } from './client/client.component';
import { ProvablyFairComponent } from './provably-fair/provably-fair.component';
import { GameResultComponent } from './game-result/game-result.component';

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    ClientComponent,
    ProvablyFairComponent,
    GameResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
