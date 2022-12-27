import { Component, Injectable, OnInit } from '@angular/core'
import { Game } from '../game/game.model'
import { ProvablyFairService } from '../provably-fair/provably-fair.service'
import Utils from '../utils'

@Component({
    selector: 'app-client',
    template: `
    <p>
        Client seed: <input (keyup)="onKey($event)" value="{{ clientSeed }}">
    </p>
  `,
    styles: [
    ]
})
@Injectable({ providedIn: 'root' })
export class ClientComponent implements OnInit {
    public clientSeed: string = ''

    constructor(private provablyFairService: ProvablyFairService) { }

    ngOnInit() {
        this.subscribeGame()
        this.clientSeed = Utils.generateRandomSeed()
        this.provablyFairService.setClientSeed(this.clientSeed)
    }

    onKey(event: any) {
        this.provablyFairService.setClientSeed(event.target.value)
    }

    subscribeGame(): void {
        this.provablyFairService.subscribeGame()
            .subscribe((value: Game) => this.clientSeed = value.clientSeed)
    }
}
