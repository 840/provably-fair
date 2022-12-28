import { Component, OnInit } from '@angular/core';
import { ProvablyFairService } from '../provably-fair/provably-fair.service'

@Component({
    selector: 'app-server',
    template: `
    <mat-form-field>
        <mat-label>Server seed (hash)</mat-label>
        <input matInput disabled value="{{ getServerSeedHash() }}">
    </mat-form-field>

    <mat-form-field>
        <mat-label>Nonce</mat-label>
        <input matInput disabled value="{{ getNonce() }}">
    </mat-form-field>
  `,
    styles: []
})
export class ServerComponent implements OnInit {
    constructor(private provablyFairService: ProvablyFairService) { }

    ngOnInit(): void {
        this.provablyFairService.newGame()
    }

    getServerSeedHash(): string {
        return this.provablyFairService.getServerSeedHash()
    }

    getNonce(): number {
        return this.provablyFairService.getNonce()
    }
}