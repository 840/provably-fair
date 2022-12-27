import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';
import { ClientComponent } from './client/client.component';
import { GameResultComponent } from './games/game-result/game-result.component';
import { GameRngComponent } from './games/game-rng/game-rng.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { GameInputComponent } from './games/game-input/game-input.component';

@NgModule({
    declarations: [
        AppComponent,
        ServerComponent,
        ClientComponent,
        GameRngComponent,
        NavBarComponent,
        GameInputComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        GameResultComponent
    ]
})
export class AppModule { }
