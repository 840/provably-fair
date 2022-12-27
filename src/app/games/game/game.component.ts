import { Component, OnInit } from '@angular/core';
import { GameService } from './game.service'

@Component({
  selector: 'app-game',
  template: ``,
  styles: []
})
export class GameComponent implements OnInit {

    constructor(private gameService: GameService) {}

    ngOnInit() {
        this.gameService.newGame()
    }
}
