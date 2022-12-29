import { Component, Input} from '@angular/core';
import { GameService } from '../game/game.service'

type SlotAnimStyle = {
    transitionDuration: string
    transform: string
}

@Component({
    selector: 'app-game-dice',
    templateUrl: './game-dice.component.html',
    styleUrls: ['./game-dice.component.scss']
})
export class GameDiceComponent {
    public roll: string
    public slotNumbers = [...Array(10).keys()]
    
    @Input() rollDisabled = false
    @Input() slotsAnim1: SlotAnimStyle
    @Input() slotsAnim2: SlotAnimStyle
    @Input() slotsAnim3: SlotAnimStyle
    @Input() slotsAnim4: SlotAnimStyle

    constructor(private gameService: GameService) {}

    debug(): void {
        this.gameService.debug()
    }

    playGame(): void {
        const rollNumber = Math.ceil(this.gameService.playGame(4000).roll * 100).toString()
        this.roll = rollNumber.padStart(4, '0')
        this.playAnim()
    }

    async playAnim(): Promise<void> {
        this.slotsAnim1 = this.playAnimStyle(4, parseInt(this.roll[0]))
        this.slotsAnim2 = this.playAnimStyle(3, parseInt(this.roll[1]))
        this.slotsAnim3 = this.playAnimStyle(2, parseInt(this.roll[2]))
        this.slotsAnim4 = this.playAnimStyle(1, parseInt(this.roll[3]))
        
        this.toggleRollButton()
        await new Promise(resolve => setTimeout(resolve, 4000))
        this.resetAnim()
        this.toggleRollButton()
    }

    async resetAnim(): Promise<void> {
        this.slotsAnim1 = this.resetAnimStyle(parseInt(this.roll[0]))
        this.slotsAnim2 = this.resetAnimStyle(parseInt(this.roll[1]))
        this.slotsAnim3 = this.resetAnimStyle(parseInt(this.roll[2]))
        this.slotsAnim4 = this.resetAnimStyle(parseInt(this.roll[3]))
    }

    playAnimStyle(duration: number, number: number): SlotAnimStyle {
        return {
            'transitionDuration': `${duration}s`,
            'transform': `translateY(-${number * 30 - (duration - 4) * 300}px)`
        }
    }

    resetAnimStyle(number: number): SlotAnimStyle {
        return {
            'transitionDuration': `0s`,
            'transform': `translateY(-${number * 30 + 2100}px)`
        }
    }

    private toggleRollButton(): void {
        this.rollDisabled = !this.rollDisabled
    }
}