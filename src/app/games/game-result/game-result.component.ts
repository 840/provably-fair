import { Component, ViewChild, AfterViewInit } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTable, MatTableDataSource } from '@angular/material/table'
import { GameService } from '../game/game.service'
import { GameResult } from './game-result.model'

@Component({
    selector: 'app-game-result',
    templateUrl: './game-result.component.html',
    styles: [],
})
export class GameResultComponent implements AfterViewInit {
    public gameResults: GameResult[] = []
    public displayedColumns: string[] = ['nonce', 'timestamp', 'roll', 'clientSeed', 'serverSeed', 'serverSeedHash', 'verify']
    public dataSource = new MatTableDataSource<GameResult>(this.gameResults)

    @ViewChild(MatPaginator) paginator: MatPaginator
    @ViewChild(MatTable) table: MatTable<Element>

    constructor(private gameService: GameService) { }

    ngAfterViewInit() {
        this.subscribeGameResults()
        this.dataSource.paginator = this.paginator
    }

    subscribeGameResults(): void {
        this.gameService.subscribeGameResults()
            .subscribe((value: GameResult[]) => {
                this.gameResults = [...value].reverse()
                this.dataSource.data = this.gameResults
                this.table.renderRows()
            })
    }
}