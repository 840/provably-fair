import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { ProvablyFairService } from 'src/app/provably-fair/provably-fair.service'
import Utils from 'src/app/utils'
import { GameResult } from '../game-result/game-result.model'
import { Game } from './game.model'

@Injectable({
  providedIn: 'root'
})
export class GameService {
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

    playGame(): void {
        const result = this.provablyFairService.playGame()
        this.addGameResults(result)
    }

    debug(): void {
        console.log(`Client seed: ${this.provablyFairService.getClientSeed()}`)
        console.log(`Server seed (hash): ${Utils.hashSeed(this.provablyFairService.getServerSeed())}`)
        console.log(`Nonce: ${this.provablyFairService.getNonce()}`)
    }
}
