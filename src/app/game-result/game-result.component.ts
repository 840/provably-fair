import { Component, Input, OnInit } from '@angular/core'
import { ProvablyFairService } from '../provably-fair/provably-fair.service'
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

    constructor(private provablyFairService: ProvablyFairService) { }

    ngOnInit(): void {
        this.subscribeGameResults()
    }

    subscribeGameResults(): void {
        this.provablyFairService.subscribeGameResults()
            .subscribe((value: GameResult[]) => this.gameResults = [...value].reverse())
    }
}
