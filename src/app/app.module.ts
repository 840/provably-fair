import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ServerComponent } from './server/server.component'
import { ClientComponent } from './client/client.component'
import { GameResultComponent } from './games/game-result/game-result.component'
import { GameRngComponent } from './games/game-rng/game-rng.component'
import { GameInputComponent } from './games/game-input/game-input.component'
import { GameNavComponent } from './games/game-nav/game-nav.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatTabsModule } from '@angular/material/tabs'
import { MatTableModule } from '@angular/material/table'
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatPaginatorModule } from '@angular/material/paginator'

@NgModule({
    declarations: [
        AppComponent,
        ServerComponent,
        ClientComponent,
        GameRngComponent,
        GameInputComponent,
        GameNavComponent,
        GameResultComponent
    ],
    providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatButtonModule,
        MatTabsModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatGridListModule,
        MatPaginatorModule
    ]
})
export class AppModule { }
