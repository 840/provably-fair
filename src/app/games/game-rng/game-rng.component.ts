import { Component } from '@angular/core';
import { GameService } from '../game/game.service'

@Component({
    selector: 'app-game-rng',
    templateUrl: './game-rng.component.html',
    styleUrls: ['./game-rng.component.scss']
})
export class GameRngComponent {
    constructor(private gameService: GameService) {}

    debug(): void {
        this.gameService.debug()
    }

    playGame(): void {
        this.gameService.playGame()
    }
}
