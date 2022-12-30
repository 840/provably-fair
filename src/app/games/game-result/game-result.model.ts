import { Game } from "../game/game.model"

export interface GameResult extends Game {
    roll: number
    hostSeedHash: string
    date: string
}
