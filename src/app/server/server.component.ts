import { Component, OnInit } from '@angular/core';
import { Game } from '../game/game.model'
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

    constructor(private provablyFairService: ProvablyFairService) { }

    ngOnInit() {
        this.subscribeGame()
        this.nonce += 1
        this.provablyFairService.setNonce(this.nonce)
        this.serverSeed = Utils.generateRandomSeed()
        this.provablyFairService.setServerSeed(this.serverSeed)
    }

    getServerSeedHash(): string {
        return Utils.hashSeed(this.serverSeed)
    }

    getNonce(): number {
        return this.nonce
    }

    subscribeGame(): void {
        this.provablyFairService.subscribeGame()
            .subscribe((value: Game) => { 
                this.serverSeed = value.serverSeed
                this.nonce = value.nonce
            })
    }
}