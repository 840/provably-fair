import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { LocalStorageService } from 'src/app/local-storage/local-storage.service'
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

    constructor(
        private _provablyFairService: ProvablyFairService,
        private _localStorage: LocalStorageService
    ) { }
        
    setNonce(value: number): void {
        this._provablyFairService.setNonce(value)
    }

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

    deleteGameResults(): void {
        this._gameResults = []
        this._gameResultsSubject.next(this._gameResults)
    }

    async addGameResults(value: GameResult, delayInMs = 0): Promise<void> {
        this._gameResults.push(value)
        if (this._toggleNoDelay) {
            await new Promise(resolve => setTimeout(resolve, delayInMs))  
        }
        this._localStorage.saveData('gameResults', JSON.stringify(this._gameResults))
        this._gameResultsSubject.next(this._gameResults)
    }

    toggleNoDelay(): void {
        this._toggleNoDelay = !this._toggleNoDelay
    }

    playGame(delayInMs: number): GameResult {
        const result = this._provablyFairService.playGame()
        this.addGameResults(result, delayInMs)
        return result
    }

    debug(): void {
        console.log(`Client seed: ${this._provablyFairService.getClientSeed()}`)
        console.log(`Server seed (hash): ${this._provablyFairService.getServerSeedHash()}`)
        console.log(`Nonce: ${this._provablyFairService.getNonce()}`)
    }
}
