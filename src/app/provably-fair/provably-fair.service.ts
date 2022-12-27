import { Injectable } from '@angular/core';
import Utils from '../utils'

@Injectable({
    providedIn: 'root'
})
export class ProvablyFairService {
    private _clientSeed: string
    private _serverSeed: string
    private _nonce: number = -1

    constructor() { }

    getClientSeed(): string {
        return this._clientSeed
    }

    setClientSeed(value: string): void {
        this._clientSeed = value
    }

    getServerSeed(): string {
        return this._serverSeed
    }

    generateServerSeed(): void {
        this._serverSeed = Utils.generateRandomSeed()
    }

    getNonce(): number {
        return this._nonce
    }

    incrementNonce(): void {
        this._nonce++
    }
}