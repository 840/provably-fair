import { Component, ViewChild, AfterViewInit, Input, Inject } from '@angular/core'
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator'
import { MatTable, MatTableDataSource } from '@angular/material/table'
import { GameService } from '../game/game.service'
import { SHA256 } from 'crypto-js'
import { GameResult } from './game-result.model'
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
    selector: 'app-game-result',
    templateUrl: './game-result.component.html',
    styleUrls: ['./game-result.component.scss']
})
export class GameResultComponent implements AfterViewInit {
    public gameResults: GameResult[] = []
    public displayedColumns: string[] = ['nonce', 'time', 'roll', 'clientSeed', 'serverSeed', 'serverSeedHash', 'verify']
    public dataSource = new MatTableDataSource<GameResult>(this.gameResults)

    @ViewChild(MatPaginator) paginator: MatPaginator
    @ViewChild(MatTable) table: MatTable<Element>
    @Input() toggleDelay: boolean

    constructor(private gameService: GameService, public dialog: MatDialog) { }

    ngAfterViewInit() {
        this.subscribeGameResults()
        this.toggleNoDelay()
        this.dataSource.paginator = this.paginator
    }

    validateRollDialog(data: GameResult): void {
        this.dialog.open(GameResultValidateRollComponent, { data })
    }

    toggleNoDelay(): void {
        this.gameService.toggleNoDelay()
    }

    subscribeGameResults(): void {
        this.gameService.subscribeGameResults()
            .subscribe((value: GameResult[]) => {
                this.gameResults = [...value].reverse()
                this.dataSource.data = this.gameResults
                this.table.renderRows()
            })
    }

    subscribeToggleNoDelay(): void {
        this.gameService.subscribeToggleNoDelay()
            .subscribe((value: boolean) => { this.toggleDelay = value })
    }
}

@Component({
    selector: 'app-game-result-validate-roll-dialog',
    templateUrl: 'game-result-validate-roll-dialog.html'
})
export class GameResultValidateRollComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: GameResult, private _snackBar: MatSnackBar) { }

    generateCodeSnippet(clientSeed: string, serverSeed: string, nonce: number): string {
        return `            const crypto = require('crypto')

            const clientSeed = '${clientSeed}'
            const serverSeed = '${serverSeed}'
            const nonce = '${nonce}'

            roll('${clientSeed}', '${serverSeed}', '${nonce}')

            function roll(clientSeed, serverSeed, nonce) {
                const input = clientSeed + '-' + nonce
                const hash = crypto.createHmac('sha512', serverSeed).update(input).digest('hex')

                let index = 0
                let roll = 0

                do {
                    index++
                    roll = parseInt(hash.substring(index * 5, index * 5 + 5), 16)

                    if (index * 5 + 5 > 128) {
                        roll = 99.99
                        break
                    }
                } while (roll >= Math.pow(10, 6))

                roll %= Math.pow(10, 4)
                roll /= Math.pow(10, 2)

                console.log('Nonce: ' + nonce)
                console.log('Client seed: ' + clientSeed)
                console.log('Server seed: ' + serverSeed)
                console.log('Server seed (hash): ' + hash)
                console.log('Roll: ' + roll)

                return roll
            }
       `
    }

    copyToClipboard(value: string): void {
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = value;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
        this._snackBar.open('Copied to clipboard!', 'Close');
    }

    serverSeedEncryption(serverSeed: string): string {
        return SHA256(serverSeed).toString()
    }
}