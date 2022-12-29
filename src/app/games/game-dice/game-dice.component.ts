import { Component, Input} from '@angular/core';
import { GameService } from '../game/game.service'
@Component({
    selector: 'app-game-dice',
    templateUrl: './game-dice.component.html',
    styleUrls: ['./game-dice.component.scss']
})
export class GameDiceComponent {
    public roll = '----'
    public rollAnim = [false, false, false, false]
    public slotNumbers = [...Array(10).keys()]
    
    @Input() slotsAnim1: { transitionDuration: string; transform: string }
    @Input() slotsAnim2: { transitionDuration: string; transform: string }
    @Input() slotsAnim3: { transitionDuration: string; transform: string }
    @Input() slotsAnim4: { transitionDuration: string; transform: string }

    constructor(private gameService: GameService) {}

    debug(): void {
        this.gameService.debug()
    }

    playGame(): void {
        const rollNumber = Math.ceil(this.gameService.playGame().roll * 100).toString()
        this.roll = rollNumber.padStart(4, '0')
        this.playAnim()
    }

    async playAnim(): Promise<void> {
        this.slotsAnim1 = {
            'transitionDuration': `4s`,
            'transform': `translateY(-${parseInt(this.roll[0]) * 30 + 1200}px)`
        }

        this.slotsAnim2 = {
            'transitionDuration': `3s`,
            'transform': `translateY(-${parseInt(this.roll[1]) * 30 + 1200}px)`
        }

        this.slotsAnim3 = {
            'transitionDuration': `2s`,
            'transform': `translateY(-${parseInt(this.roll[2]) * 30 + 1200}px)`
        }

        this.slotsAnim4 = {
            'transitionDuration': `1s`,
            'transform': `translateY(-${parseInt(this.roll[3]) * 30 + 1200}px)`
        }

        await new Promise((resolve) => setTimeout(resolve, 4000))

        this.resetAnim()
    }    

    async resetAnim(): Promise<void> {
        this.slotsAnim1 = {
            'transitionDuration': `0s`,
            'transform': `translateY(-${parseInt(this.roll[0]) * 30 + 300}px)`
        }

        this.slotsAnim2 = {
            'transitionDuration': `0s`,
            'transform': `translateY(-${parseInt(this.roll[1]) * 30 + 300}px)`
        }

        this.slotsAnim3 = {
            'transitionDuration': `0s`,
            'transform': `translateY(-${parseInt(this.roll[2]) * 30 + 300}px)`
        }

        this.slotsAnim4 = {
            'transitionDuration': `0s`,
            'transform': `translateY(-${parseInt(this.roll[3]) * 30 + 300}px)`
        }
    }
}