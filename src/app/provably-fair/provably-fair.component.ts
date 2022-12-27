import { Component, OnInit } from '@angular/core'
import { HmacSHA512, enc } from 'crypto-js'
import { GameResult } from '../game-result/game-result.model'
import { Game } from '../game/game.model'
import { ProvablyFairService } from './provably-fair.service'
import Utils from '../utils'

@Component({
    selector: 'app-provably-fair',
    templateUrl: './provably-fair.component.html',
    styleUrls: ['./provably-fair.component.scss']
})
export class ProvablyFairComponent implements OnInit {
    private _game: Game

    constructor(private provablyFairService: ProvablyFairService) {}

    ngOnInit(): void {
        this.subscribeGame()
        this.newGame()
    }

    debug(): void {
        console.log(`Client seed: ${this._game.clientSeed}`)
        console.log(`Server seed (hash): ${Utils.hashSeed(this._game.serverSeed)}`)
        console.log(`Nonce: ${this._game.nonce}`)
    }

    newGame(): void {
        this.provablyFairService.setServerSeed(Utils.generateRandomSeed())
        this.provablyFairService.setNonce(this.provablyFairService.getNonce() + 1)
    }

    playGame(): void {
        this.provablyFairService.addGameResults({
            ...this._game,
            roll: this.roll(),
            serverSeedHash: Utils.hashSeed(this._game.serverSeed),
            date: (new Date()).toLocaleString('en-GB', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
              })
        })

        this.newGame()
    }

    roll(): number {
        const input = `${this._game.clientSeed}-${this._game.nonce}`
        const hash = HmacSHA512(input, this._game.serverSeed).toString(enc.Hex)

        let index = 0
        let roll = 0

        do {
            index++
            roll = parseInt(hash.substring(index * 5, index * 5 + 5), 16)

            if (index * 5 + 5 > 128) {
                roll = 99.99
                break
            }
        } while (roll >= Math.pow(10, 6))

        roll %= Math.pow(10, 4)
        roll /= Math.pow(10, 2)

        return roll
    }

    subscribeGame(): void {
        this.provablyFairService.subscribeGame()
            .subscribe((value: Game) => this._game = value)
    }
}