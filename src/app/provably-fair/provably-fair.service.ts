import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs'
import { Game } from '../game/game.model'
import { GameResult } from '../game-result/game-result.model';

@Injectable({
    providedIn: 'root'
})
export class ProvablyFairService {
    private _game: Game
    private _gameSubject = new Subject<Game>()
    private _gameResults: GameResult[] = []
    private _gameResultsSubject = new Subject<GameResult[]>()

    constructor() { }

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

    getGame(): Game {
        return this._game
    }

    setGame(value: Game): void {
        this._game = value
        this._gameSubject.next(this._game)
    }

    getClientSeed(): string {
        return this._game.clientSeed
    }

    setClientSeed(value: string): void {
        this._game = {...this._game, clientSeed: value}
        this._gameSubject.next(this._game)
    }

    getServerSeed(): string {
        return this._game.serverSeed
    }

    setServerSeed(value: string): void {
        this._game = {...this._game, serverSeed: value}
        this._gameSubject.next(this._game)
    }

    getNonce(): number {
        return this._game.nonce
    }

    setNonce(value: number): void {
        this._game = {...this._game, nonce: value}
        this._gameSubject.next(this._game)
    }
}