import { Component, OnInit } from '@angular/core'
import { GameService } from '../game/game.service'
import { GameResult } from './game-result.model'

@Component({
    selector: 'app-game-result',
    template: `
  <table>
    <tr>
        <th>#</th>
        <th>Date</th>
        <th>Roll</th>
        <th>Client seed</th>
        <th>Server seed</th>
        <th>Server seed (hash)</th>
    </tr>
    <tr *ngFor="let gameResult of gameResults">
        <td>{{gameResult.nonce}}</td>
        <td>{{gameResult.date}}</td>
        <td>{{gameResult.roll}}</td>
        <td>{{gameResult.clientSeed}}</td>
        <td>{{gameResult.serverSeed}}</td>
        <td>{{gameResult.serverSeedHash}}</td>
    </tr>
</table>
  `,
    styles: [
        'table { width: 100% }',
        'table, th, td { border: 1px solid black; }'
    ]
})
export class GameResultComponent implements OnInit {
    public gameResults: GameResult[]

    constructor(private gameService: GameService) { }

    ngOnInit(): void {
        this.subscribeGameResults()
    }

    subscribeGameResults(): void {
        this.gameService.subscribeGameResults()
            .subscribe((value: GameResult[]) => this.gameResults = [...value].reverse())
    }
}
