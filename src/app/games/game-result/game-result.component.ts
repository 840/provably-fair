import { Component, ViewChild, AfterViewInit, Input } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator'
import { MatTable, MatTableDataSource } from '@angular/material/table'
import { GameService } from '../game/game.service'
import { GameResult } from './game-result.model'
import { MatSnackBar } from '@angular/material/snack-bar'
import { LocalStorageService } from 'src/app/local-storage/local-storage.service'
import { GameResultValidateRollComponent } from './game-result-validate/game-result-validate.component'


@Component({
    selector: 'app-game-result',
    templateUrl: './game-result.component.html',
    styleUrls: ['./game-result.component.scss']
})
export class GameResultComponent implements AfterViewInit {
    protected gameResults: GameResult[] = []
    protected displayedColumns: string[] = ['nonce', 'time', 'roll', 'clientSeed', 'serverSeed', 'serverSeedHash', 'verify']
    protected dataSource = new MatTableDataSource<GameResult>(this.gameResults)
    protected hasResults: boolean

    @ViewChild(MatPaginator) paginator: MatPaginator
    @ViewChild(MatTable) table: MatTable<Element>
    @Input() toggleDelay: boolean

    constructor(
        private _gameService: GameService,
        private _localStorage: LocalStorageService,
        private _snackBar: MatSnackBar,
        protected dialog: MatDialog
    ) { }

    public ngAfterViewInit() {
        const savedData = this._localStorage.getData('gameResults')

        this.subscribeGameResults()
        this.toggleNoDelay()

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

    protected toggleNoDelay(): void {
        this._gameService.toggleNoDelay()
    }

    protected deleteResults(): void {
        const snackBarRef = this._snackBar.open('Results wiped!', 'Undo', { duration: 15000 })
        const savedData = this._localStorage.getData('gameResults')
        const checkPoint: GameResult[] = []

        if (typeof savedData === 'string') {
            JSON.parse(savedData).forEach((gameResult: GameResult) => {
                checkPoint.push(gameResult)
            })
        }

        this._gameService.deleteGameResults()
        this._gameService.setNonce(1)
        this._localStorage.removeData('gameResults')

        snackBarRef.onAction().subscribe(() => {
            this._localStorage.saveData('gameResults', JSON.stringify(checkPoint))
            checkPoint.forEach((gameResult: GameResult) => {
                this._gameService.addGameResults(gameResult)
            })
            this._gameService.setNonce(checkPoint.length)
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

    private subscribeToggleNoDelay(): void {
        this._gameService.subscribeToggleNoDelay()
            .subscribe((value: boolean) => { this.toggleDelay = value })
    }
}