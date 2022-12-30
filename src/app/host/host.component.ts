import { Component, OnInit } from '@angular/core';
import { ProvablyFairService } from '../provably-fair/provably-fair.service'

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
    constructor(private provablyFairService: ProvablyFairService) { }

    public ngOnInit(): void {
        this.provablyFairService.newGame()
    }

    protected getHostSeedHash(): string {
        return this.provablyFairService.getHostSeedHash()
    }

    protected getNonce(): number {
        return this.provablyFairService.getNonce()
    }
}