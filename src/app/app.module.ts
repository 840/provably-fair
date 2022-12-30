import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ServerComponent } from './server/server.component'
import { ClientComponent } from './client/client.component'
import { GameResultComponent } from './games/game-result/game-result.component'
import { GameResultValidateRollComponent } from './games/game-result/game-result-validate/game-result-validate.component'
import { GameDiceComponent } from './games/game-dice/game-dice.component'
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
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { ToolbarComponent } from './toolbar/toolbar.component'


@NgModule({
    declarations: [
        AppComponent,
        ServerComponent,
        ClientComponent,
        GameInputComponent,
        GameNavComponent,
        GameResultComponent,
        GameResultValidateRollComponent,
        ToolbarComponent,
        GameDiceComponent
    ],
    providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
    ],
    bootstrap: [AppComponent],
    imports: [
        CommonModule,
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
        MatPaginatorModule,
        MatSlideToggleModule,
        MatDialogModule,
        MatIconModule,
        MatSnackBarModule,
        MatToolbarModule
    ]
})
export class AppModule { }
