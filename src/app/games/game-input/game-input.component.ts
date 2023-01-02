import { Component, OnInit } from '@angular/core'
import { Game } from '../game/game.model'
import { GameService } from '../game/game.service'

@Component({
    selector: 'app-game-input',
    templateUrl: './game-input.component.html',
    styleUrls: ['./game-input.component.scss']
})
    
export class GameInputComponent implements OnInit {
    protected clientSeed: string

    constructor(private _gameService: GameService) { }

    public ngOnInit() {
        this._gameService.newGame()
        this.subscribeGame()
    }

    private subscribeGame(): void {
        this._gameService.subscribeGame()
            .subscribe((value: Game) => this.clientSeed = value.clientSeed)
    }
}