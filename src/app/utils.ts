export default class Utils {
    static generateRandomSeed(): string { return Math.random().toString(36).substring(2) }
}