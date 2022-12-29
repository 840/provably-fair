import { Injectable } from '@angular/core';
import { SHA256, HmacSHA512, enc } from 'crypto-js'
import { GameResult } from '../games/game-result/game-result.model'
import Utils from '../utils'

@Injectable({
    providedIn: 'root'
})
export class ProvablyFairService {
    private _clientSeed: string
    private _serverSeed: string
    private _nonce = 0

    public getClientSeed(): string {
        return this._clientSeed
    }

    public setClientSeed(value: string): void {
        this._clientSeed = value
    }

    public getServerSeedHash(): string {
        return SHA256(this._serverSeed).toString()
    }

    public getNonce(): number {
        return this._nonce
    }

    public newGame(): void {
        this.generateServerSeed()
        this.incrementNonce()
    }

    public playGame(): GameResult {
        const result = {
            clientSeed: this._clientSeed,
            serverSeed: this._serverSeed,
            nonce: this._nonce,
            roll: this.roll(),
            serverSeedHash: this.getServerSeedHash(),
            date: (new Date()).toLocaleString('en-GB', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            })
        }
        this.newGame()
        return result
    }

    private roll(): number {
        const input = `${this._clientSeed}-${this._nonce}`
        const hash = HmacSHA512(input, this._serverSeed).toString(enc.Hex)

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

        return roll
    }

    private generateServerSeed(): void {
        this._serverSeed = Utils.generateRandomSeed()
    }

    private incrementNonce(): void {
        this._nonce++
    }
}