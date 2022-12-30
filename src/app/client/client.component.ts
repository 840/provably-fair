import { Component, OnInit } from '@angular/core'
import { Game } from '../games/game/game.model'
import { GameService } from '../games/game/game.service'
import { ProvablyFairService } from '../provably-fair/provably-fair.service'
import Utils from '../utils'

@Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss']
})

export class ClientComponent implements OnInit {
    public clientSeed = ''

    constructor(
        private provablyFairService: ProvablyFairService,
        private gameService: GameService
    ) { }

    public ngOnInit() {
        this.subscribeGame()
        this.generateClientSeed()
    }

    protected onKey(event: KeyboardEvent) {
        if (event.target instanceof HTMLInputElement) {
            this.provablyFairService.setClientSeed(event.target.value)
        }
    }

    protected generateClientSeed(): void {
        this.clientSeed = Utils.generateRandomSeed()
        this.provablyFairService.setClientSeed(this.clientSeed)
    }

    private subscribeGame(): void {
        this.gameService.subscribeGame()
            .subscribe((value: Game) => this.clientSeed = value.clientSeed)
    }
}
