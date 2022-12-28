import { Component, OnInit } from '@angular/core'
import { Game } from '../game/game.model'
import { GameService } from '../game/game.service'

@Component({
    selector: 'app-game-input',
    templateUrl: './game-input.component.html',
    styleUrls: ['./game-input.component.scss']
})
    
export class GameInputComponent implements OnInit {
    public clientSeed: string

    constructor(private gameService: GameService) { }

    ngOnInit() {
        this.subscribeGame()
    }

    debug(): void {
        this.gameService.debug()
    }

    subscribeGame(): void {
        this.gameService.subscribeGame()
            .subscribe((value: Game) => this.clientSeed = value.clientSeed)
    }
}