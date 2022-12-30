import { Component, Inject } from '@angular/core'
import { SHA256 } from 'crypto-js'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { GameResult } from '../game-result.model'

@Component({
    selector: 'app-game-result-validate-roll-dialog',
    templateUrl: 'game-result-validate-roll-dialog.html'
})
export class GameResultValidateRollComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: GameResult, private _snackBar: MatSnackBar) { }

    protected generateCodeSnippet(clientSeed: string, hostSeed: string, nonce: number): string {
        return `const crypto = require('crypto')

const clientSeed = '${clientSeed}'
const hostSeed = '${hostSeed}'
const nonce = '${nonce}'

roll('${clientSeed}', '${hostSeed}', '${nonce}')

function roll(clientSeed, hostSeed, nonce) {
    const input = clientSeed + '-' + nonce
    const hash = crypto.createHmac('sha512', hostSeed).update(input).digest('hex')

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
    console.log('Host seed: ' + hostSeed)
    console.log('Host seed (hash): ' + crypto.createHash('sha256').update(hostSeed).digest('hex'))
    console.log('Roll: ' + roll)

    return roll
}`
    }

    protected copyToClipboard(value: string): void {
        const selBox = document.createElement('textarea')
        selBox.style.position = 'fixed'
        selBox.style.left = '0'
        selBox.style.top = '0'
        selBox.style.opacity = '0'
        selBox.value = value
        document.body.appendChild(selBox)
        selBox.focus()
        selBox.select()
        document.execCommand('copy')
        document.body.removeChild(selBox)
        this._snackBar.open('Copied to clipboard!', undefined, { duration: 2500 })
    }

    protected hostSeedEncryption(hostSeed: string): string {
        return SHA256(hostSeed).toString()
    }
}