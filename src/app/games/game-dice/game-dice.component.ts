import { Component } from '@angular/core';
import { GameService } from '../game/game.service'

@Component({
    selector: 'app-game-dice',
    templateUrl: './game-dice.component.html',
    styleUrls: ['./game-dice.component.scss']
})
export class GameDiceComponent {
    public roll = '----'

    constructor(private gameService: GameService) {}

    debug(): void {
        this.gameService.debug()
    }

    playGame(): void {
        const rollNumber = (this.gameService.playGame().roll * 100)
        if (rollNumber < 10) {
            this.roll = '000' + rollNumber.toString()
        } else if (rollNumber < 100) {
            this.roll = '00' + rollNumber.toString()
        } else if (rollNumber < 1000) {
            this.roll = '0' + rollNumber.toString()
        } else {
            this.roll = rollNumber.toString()
        }
    }
}