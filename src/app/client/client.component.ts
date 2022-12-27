import { Component, OnInit } from '@angular/core'
import { Game } from '../games/game/game.model'
import { GameService } from '../games/game/game.service'
import { ProvablyFairService } from '../provably-fair/provably-fair.service'
import Utils from '../utils'

@Component({
    selector: 'app-client',
    template: `
    <p>
        Client seed: <input (keyup)="onKey($event)" value="{{ clientSeed }}">
        <button class="btn btn-primary" (click)="generateRandomSeed()">Generate random client seed</button>
    </p>
  `,
    styles: []
})

export class ClientComponent implements OnInit {
    public clientSeed = ''

    constructor(
        private provablyFairService: ProvablyFairService,
        private gameService: GameService
    ) { }

    ngOnInit() {
        this.subscribeGame()
        this.generateRandomSeed()
    }

    onKey(event: KeyboardEvent) {
        if (event.target instanceof HTMLInputElement) {
            this.provablyFairService.setClientSeed(event.target.value)
        }
    }

    generateRandomSeed(): void {
        this.clientSeed = Utils.generateRandomSeed()
        this.provablyFairService.setClientSeed(this.clientSeed)
    }

    subscribeGame(): void {
        this.gameService.subscribeGame()
            .subscribe((value: Game) => this.clientSeed = value.clientSeed)
    }
}
