import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { ProvablyFairService } from 'src/app/provably-fair/provably-fair.service'
import { GameResult } from '../game-result/game-result.model'
import { Game } from './game.model'

@Injectable({
    providedIn: 'root'
})
export class GameService {
    private _gameSubject = new Subject<Game>()
    private _gameResults: GameResult[] = []
    private _gameResultsSubject = new Subject<GameResult[]>()
    private _toggleNoDelay = false
    private _toggleNoDelaySubject = new Subject<boolean>

    constructor(private provablyFairService: ProvablyFairService) {}

    subscribeGame(): Observable<Game> {
        return this._gameSubject.asObservable()
    }

    subscribeGameResults(): Observable<GameResult[]> {
        return this._gameResultsSubject.asObservable()
    }

    subscribeToggleNoDelay(): Observable<boolean> {
        return this._toggleNoDelaySubject.asObservable()
    }

    getGameResults(): GameResult[] {
        return this._gameResults
    }

    async addGameResults(value: GameResult, delayInMs = 0): Promise<void> {
        this._gameResults.push(value)
        if (this._toggleNoDelay) {
            await new Promise(resolve => setTimeout(resolve, delayInMs))  
        }
        this._gameResultsSubject.next(this._gameResults)
    }

    toggleNoDelay(): void {
        this._toggleNoDelay = !this._toggleNoDelay
    }

    playGame(delayInMs: number): GameResult {
        const result = this.provablyFairService.playGame()
        this.addGameResults(result, delayInMs)
        return result
    }

    debug(): void {
        console.log(`Client seed: ${this.provablyFairService.getClientSeed()}`)
        console.log(`Server seed (hash): ${this.provablyFairService.getServerSeedHash()}`)
        console.log(`Nonce: ${this.provablyFairService.getNonce()}`)
    }
}
