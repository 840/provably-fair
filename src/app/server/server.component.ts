import { Component, OnInit } from '@angular/core';
import { ProvablyFairService } from '../provably-fair/provably-fair.service'

@Component({
    selector: 'app-server',
    template: `
    <p>
        Server seed (hash): {{ getServerSeedHash() }}
    </p>
    <p>
        Nonce: {{ getNonce() }}
    </p>
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