import { Component, ViewChild, AfterViewInit, Input } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator'
import { MatTable, MatTableDataSource } from '@angular/material/table'
import { GameService } from '../game/game.service'
import { GameResult } from './game-result.model'
import { MatSnackBar } from '@angular/material/snack-bar'
import { GameResultValidateRollComponent } from './game-result-validate/game-result-validate.component'


@Component({
    selector: 'app-game-result',
    templateUrl: './game-result.component.html',
    styleUrls: ['./game-result.component.scss']
})
export class GameResultComponent implements AfterViewInit {
    protected gameResults: GameResult[] = []
    protected displayedColumns: string[] = ['nonce', 'time', 'roll', 'clientSeed', 'hostSeed', 'hostSeedHash', 'verify']
    protected dataSource = new MatTableDataSource<GameResult>(this.gameResults)
    protected hasResults: boolean

    @ViewChild(MatPaginator) paginator: MatPaginator
    @ViewChild(MatTable) table: MatTable<Element>
    @Input() toggleDelay: boolean

    constructor(
        private _gameService: GameService,
        private _snackBar: MatSnackBar,
        protected dialog: MatDialog
    ) { }

    public ngAfterViewInit() {
        const savedData = localStorage.getItem('gameResults')

        this.subscribeGameResults()

        if (typeof savedData === 'string') {
            JSON.parse(savedData).forEach((gameResult: GameResult) => {
                this._gameService.addGameResults(gameResult)
            })
        }

        this.hasResults = this._gameService.getGameResults().length <= 0
        this._gameService.setNonce(this._gameService.getGameResults().length + 1)
        this.dataSource.paginator = this.paginator
    }

    protected validateRollDialog(data: GameResult): void {
        this.dialog.open(GameResultValidateRollComponent, { data })
    }

    protected deleteResults(): void {
        const snackBarRef = this._snackBar.open('Results wiped!', 'Undo', { duration: 15000 })
        const savedData = localStorage.getItem('gameResults')
        const checkPoint: GameResult[] = []

        if (typeof savedData === 'string') {
            JSON.parse(savedData).forEach((gameResult: GameResult) => {
                checkPoint.push(gameResult)
            })
        }

        this._gameService.deleteGameResults()
        this._gameService.setNonce(1)
        localStorage.removeItem('gameResults')

        snackBarRef.onAction().subscribe(() => {
            localStorage.setItem('gameResults', JSON.stringify(checkPoint))
            checkPoint.forEach((gameResult: GameResult) => {
                this._gameService.addGameResults(gameResult)
            })
            this._gameService.setNonce(checkPoint.length + 1)
        })
    }

    private subscribeGameResults(): void {
        this._gameService.subscribeGameResults()
            .subscribe((value: GameResult[]) => {
                this.gameResults = [...value].reverse()
                this.dataSource.data = this.gameResults
                this.hasResults = this._gameService.getGameResults().length <= 0
                this.table.renderRows()
            })
    }
}