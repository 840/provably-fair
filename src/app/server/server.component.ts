import { Component, OnInit } from '@angular/core';
import { Game } from '../games/game/game.model'
import { GameService } from '../games/game/game.service'
import { ProvablyFairService } from '../provably-fair/provably-fair.service'

import Utils from '../utils'

@Component({
  selector: 'app-server',
  template: `
    <p>
        Server seed (hash): <input disabled value="{{ getServerSeedHash() }}">
    </p>
    <p>
    Nonce: <input disabled value="{{ getNonce() }}">
    </p>
  `,
  styles: [
  ]
})
export class ServerComponent implements OnInit {
    public serverSeed: string = ''
    public nonce: number = -1

    constructor(
        private provablyFairService: ProvablyFairService,
        private gameService: GameService
    ) { }

    ngOnInit() {
        this.subscribeGame()
        this.provablyFairService.incrementNonce()
        this.provablyFairService.generateServerSeed()
    }

    getServerSeedHash(): string {
        return Utils.hashSeed(this.serverSeed)
    }

    getNonce(): number {
        return this.nonce
    }

    subscribeGame(): void {
        this.gameService.subscribeGame()
            .subscribe((value: Game) => { 
                this.serverSeed = value.serverSeed
                this.nonce = value.nonce
            })
    }
}