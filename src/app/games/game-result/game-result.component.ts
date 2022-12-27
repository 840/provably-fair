import { Component, OnInit } from '@angular/core'
import { GameService } from '../game/game.service'
import { GameResult } from './game-result.model'
import { DecimalPipe, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-game-result',
    templateUrl: './game-result.component.html',
    styles: [],
    standalone: true,
    imports: [DecimalPipe, NgFor, FormsModule, NgbTypeaheadModule, NgbPaginationModule]
})
export class GameResultComponent implements OnInit {
    public gameResults: GameResult[] = []
    public gameResultsDisplay: GameResult[]
    public gameResultsSize = 1
    public page = 1;
    public pageSize = 10;

    constructor(private gameService: GameService) { }

    ngOnInit(): void {
        this.subscribeGameResults()
    }

    subscribeGameResults(): void {
        this.gameService.subscribeGameResults()
            .subscribe((value: GameResult[]) => {
                this.gameResults = [...value].reverse()
                this.gameResultsDisplay = [...this.gameResults]
                this.gameResultsSize = this.gameResultsDisplay.length
                this.refreshGameResults()
            })
    }

    refreshGameResults(): void {
        this.gameResultsDisplay = this.gameResults.map((gameResult) => ( gameResult )).slice(
            (this.page - 1) * this.pageSize,
            (this.page - 1) * this.pageSize + this.pageSize,
        );
        this.gameService.getGameResults()
    }
}
