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
        const rollNumber = (this.gameService.playGame().roll * 100)
        if (rollNumber < 10) {
            this.roll = '000' + rollNumber.toString()
        } else if (rollNumber < 100) {
            this.roll = '00' + rollNumber.toString()
        } else if (rollNumber < 1000) {
            this.roll = '0' + rollNumber.toString()
        } else {
            this.roll = rollNumber.toString()
        }
        this.playAnim()
    }

    async playAnim(duration = 1): Promise<void> {
        this.slotsAnim1 = {
            'transitionDuration': `${duration > 0 ? duration : 1}s`,
            'transform': `translateY(0)`
        }

        this.slotsAnim2 = {
            'transitionDuration': `${duration > 0 ? duration : 1}s`,
            'transform': `translateY(0)`
        }

        this.slotsAnim3 = {
            'transitionDuration': `${duration > 0 ? duration : 1}s`,
            'transform': `translateY(0)`
        }

        this.slotsAnim4 = {
            'transitionDuration': `${duration > 0 ? duration : 1}s`,
            'transform': `translateY(0)`
        }

        await new Promise((resolve) => setTimeout(resolve, duration + 1 * 1000))

        this.stopAnim()
    }    

    stopAnim(): void {
        const duration = 1
        
        this.slotsAnim1 = {
            'transitionDuration': `${duration > 0 ? duration : 1}s`,
            'transform': `translateY(-${parseInt(this.roll[0]) * 30 + 300}px)`
        }

        this.slotsAnim2 = {
            'transitionDuration': `${duration > 0 ? duration : 1}s`,
            'transform': `translateY(-${parseInt(this.roll[1]) * 30 + 300}px)`
        }

        this.slotsAnim3 = {
            'transitionDuration': `${duration > 0 ? duration : 1}s`,
            'transform': `translateY(-${parseInt(this.roll[2]) * 30 + 300}px)`
        }

        this.slotsAnim4 = {
            'transitionDuration': `${duration > 0 ? duration : 1}s`,
            'transform': `translateY(-${parseInt(this.roll[3]) * 30 + 300}px)`
        }
        
    }
}