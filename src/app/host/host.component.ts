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
export class HostComponent {
    constructor(private _gameService: GameService) { }

    protected getHostSeedHash(): string {
        return this._gameService.getHostSeedHash()
    }

    protected getNonce(): number {
        return this._gameService.getNonce()
    }
}