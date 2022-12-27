import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { ProvablyFairService } from 'src/app/provably-fair/provably-fair.service'
import Utils from 'src/app/utils'
import { GameResult } from '../game-result/game-result.model'
import { Game } from './game.model'
import { HmacSHA512, enc } from 'crypto-js'

@Injectable({
  providedIn: 'root'
})
export class GameService {
    private _game: Game
    private _gameSubject = new Subject<Game>()
    private _gameResults: GameResult[] = []
    private _gameResultsSubject = new Subject<GameResult[]>()

    constructor(private provablyFairService: ProvablyFairService) {}

    subscribeGame(): Observable<Game> {
        return this._gameSubject.asObservable()
    }

    subscribeGameResults(): Observable<GameResult[]> {
        return this._gameResultsSubject.asObservable()
    }

    getGameResults(): GameResult[] {
        return this._gameResults
    }

    addGameResults(value: GameResult): void {
        this._gameResults.push(value)
        this._gameResultsSubject.next(this._gameResults)
    }

    newGame(): void {
        this.provablyFairService.generateServerSeed()
        this.provablyFairService.incrementNonce()
        
        this.setGame({
            clientSeed: this.provablyFairService.getClientSeed(),
            serverSeed: this.provablyFairService.getServerSeed(),
            nonce: this.provablyFairService.getNonce()
        })
    }

    playGame(): Game {
        const result = {
            clientSeed: this.provablyFairService.getClientSeed(),
            serverSeed: this.provablyFairService.getServerSeed(),
            nonce: this.provablyFairService.getNonce(),
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
        }

        this.addGameResults(result)
        this.newGame()

        return result
    }

    getGame(): Game {
        return this._game
    }

    setGame(value: Game): void {
        this._game = value
        this._gameSubject.next(this._game)
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

    debug(): void {
        console.log(`Client seed: ${this.provablyFairService.getClientSeed()}`)
        console.log(`Server seed (hash): ${Utils.hashSeed(this.provablyFairService.getServerSeed())}`)
        console.log(`Nonce: ${this.provablyFairService.getNonce()}`)
    }
}
