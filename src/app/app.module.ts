import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';
import { ClientComponent } from './client/client.component';
import { GameResultComponent } from './games/game-result/game-result.component';
import { GameRngComponent } from './games/game-rng/game-rng.component';

@NgModule({
    declarations: [
        AppComponent,
        ServerComponent,
        ClientComponent,
        GameResultComponent,
        GameRngComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule
    ]
})
export class AppModule { }
