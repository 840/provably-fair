import { SHA256 } from 'crypto-js'

export default class Utils {
    static generateRandomSeed(): string { return Math.random().toString(36).substring(2) }
    static hashSeed(value: string): string { return SHA256(value).toString() }
}