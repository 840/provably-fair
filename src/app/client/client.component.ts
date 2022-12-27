import { Component, Injectable, OnInit } from '@angular/core'
import { Game } from '../games/game/game.model'
import { GameService } from '../games/game/game.service'
import { ProvablyFairService } from '../provably-fair/provably-fair.service'
import Utils from '../utils'

@Component({
    selector: 'app-client',
    template: `
    <p>
        Client seed: <input (keyup)="onKey($event)" value="{{ clientSeed }}">
        <button (click)="generateRandomSeed()">Generate random client seed</button>
    </p>
  `,
    styles: []
})
@Injectable({ providedIn: 'root' })
export class ClientComponent implements OnInit {
    public clientSeed: string = ''

    constructor(
        private provablyFairService: ProvablyFairService,
        private gameService: GameService
    ) { }

    ngOnInit() {
        this.subscribeGame()
        this.generateRandomSeed()
    }

    onKey(event: any) {
        this.provablyFairService.setClientSeed(event.target.value)
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
