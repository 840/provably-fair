import { Component, OnInit } from '@angular/core';
import { ProvablyFairService } from '../provably-fair/provably-fair.service'

@Component({
  selector: 'app-server',
  template: `
    <p>
        Server seed (hash): <input disabled value="{{ getServerSeedHash() }}">
    </p>
    <p>
    Nonce: <input disabled value="{{ getNonce() }}">
    </p>
  `,
  styles: [
  ]
})
export class ServerComponent implements OnInit {
    constructor(private provablyFairService: ProvablyFairService) { }

    ngOnInit(): void {
        this.provablyFairService.newGame()
    }

    getServerSeedHash(): string {
        return this.provablyFairService.getServerSeed()
    }

    getNonce(): number {
        return this.provablyFairService.getNonce()
    }
}