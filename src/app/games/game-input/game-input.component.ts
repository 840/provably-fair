import { Component } from '@angular/core';
import { GameService } from '../game/game.service'

@Component({
  selector: 'app-game-input',
  templateUrl: './game-input.component.html',
  styleUrls: ['./game-input.component.scss']
})
export class GameInputComponent {
    constructor(private gameService: GameService) {}

    debug(): void {
        this.gameService.debug()
    }
}
