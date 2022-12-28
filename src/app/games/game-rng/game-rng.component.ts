import { Component } from '@angular/core';
import { GameService } from '../game/game.service'

@Component({
    selector: 'app-game-rng',
    templateUrl: './game-rng.component.html',
    styleUrls: ['./game-rng.component.scss']
})
export class GameRngComponent {
    public roll = 0

    constructor(private gameService: GameService) {}

    debug(): void {
        this.gameService.debug()
    }

    playGame(): void {
        this.roll = this.gameService.playGame().roll
    }
}