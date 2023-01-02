import { Component, OnInit } from '@angular/core';
import { GameService } from '../games/game/game.service'

@Component({
    selector: 'app-host',
    template: `
    <mat-form-field>
        <mat-label>Host seed (hash)</mat-label>
        <input matInput disabled value="{{ getHostSeedHash() }}">
    </mat-form-field>

    <mat-form-field>
        <mat-label>Nonce</mat-label>
        <input matInput disabled value="{{ getNonce() }}">
    </mat-form-field>
  `,
    styles: []
})
export class HostComponent implements OnInit {
    constructor(private _gameService: GameService) { }

    public ngOnInit(): void {
        this._gameService.newGame()
    }

    protected getHostSeedHash(): string {
        return this._gameService.getHostSeedHash()
    }

    protected getNonce(): number {
        return this._gameService.getNonce()
    }
}