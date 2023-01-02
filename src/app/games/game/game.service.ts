import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { LocalStorageService } from 'src/app/local-storage/local-storage.service'
import { ProvablyFairService } from 'src/app/provably-fair/provably-fair.service'
import { GameResult } from '../game-result/game-result.model'
import { Game } from './game.model'

@Injectable({
    providedIn: 'root'
})
export class GameService extends ProvablyFairService {
    private _gameSubject = new Subject<Game>()
    private _gameResults: GameResult[] = []
    private _gameResultsSubject = new Subject<GameResult[]>()

    constructor(private _localStorage: LocalStorageService) { 
        super()
    }

    subscribeGame(): Observable<Game> {
        return this._gameSubject.asObservable()
    }

    subscribeGameResults(): Observable<GameResult[]> {
        return this._gameResultsSubject.asObservable()
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
        await new Promise(resolve => setTimeout(resolve, delayInMs))
        this._localStorage.saveData('gameResults', JSON.stringify(this._gameResults))
        this._gameResultsSubject.next(this._gameResults)
    }

    playGame(delayInMs: number): GameResult {
        const result = this.calculateResult()
        this.addGameResults(result, delayInMs)
        return result
    }
}
