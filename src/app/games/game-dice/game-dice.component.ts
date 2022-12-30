import { Component, Input } from '@angular/core'
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
    private readonly _slotSize = 30
    private readonly _reelSize = 300
    private readonly _reelCountPerGroup = 9
    private readonly _fastModeSpeed = 1
    private readonly _normalModeSpeed = 4
    
    protected readonly slotNumbers = [...Array(10).keys()]
    protected readonly reelCountPerGroupArray = [...Array(this._reelCountPerGroup + 2).keys()]
    
    protected roll: string

    protected fastMode = false
    private _fastModeModifier = this._normalModeSpeed

    @Input() rollDisabled = false
    @Input() slotsAnim1: SlotAnimStyle
    @Input() slotsAnim2: SlotAnimStyle
    @Input() slotsAnim3: SlotAnimStyle
    @Input() slotsAnim4: SlotAnimStyle

    constructor(private _gameService: GameService) { }
    
    protected playGame(): void {
        const rollNumber = Math.ceil(this._gameService.playGame(1000 * this._fastModeModifier).roll * 100).toString()
        this.roll = rollNumber.padStart(4, '0')
        this.playAnim()
    }

    private async playAnim(): Promise<void> {
        this.slotsAnim1 = this.playAnimStyle(4, parseInt(this.roll[0]))
        this.slotsAnim2 = this.playAnimStyle(3, parseInt(this.roll[1]))
        this.slotsAnim3 = this.playAnimStyle(2, parseInt(this.roll[2]))
        this.slotsAnim4 = this.playAnimStyle(1, parseInt(this.roll[3]))
        
        this.toggleRollButton()
        await new Promise(resolve => setTimeout(resolve, 1000 * this._fastModeModifier))
        this.resetAnim()
        this.toggleRollButton()
    }

    private async resetAnim(): Promise<void> {
        this.slotsAnim1 = this.resetAnimStyle(parseInt(this.roll[0]))
        this.slotsAnim2 = this.resetAnimStyle(parseInt(this.roll[1]))
        this.slotsAnim3 = this.resetAnimStyle(parseInt(this.roll[2]))
        this.slotsAnim4 = this.resetAnimStyle(parseInt(this.roll[3]))
    }

    private playAnimStyle(duration: number, number: number): SlotAnimStyle {
        this.fastMode ? duration = this._fastModeSpeed : duration
        const translateModifier = this.fastMode
            ? `translateY(-${number * this._slotSize + 5 * this._reelSize}px)`
            : `translateY(-${number * this._slotSize - (duration - this._normalModeSpeed) * this._reelSize}px)`
        return {
            'transitionDuration': `${duration}s`,
            'transform': translateModifier
        }
    }

    private resetAnimStyle(number: number): SlotAnimStyle {
        return {
            'transitionDuration': `0s`,
            'transform': `translateY(-${number * this._slotSize + this._reelSize * this._reelCountPerGroup}px)`
        }
    }

    protected toggleFastMode(): void {
        this.fastMode
            ? this._fastModeModifier = this._normalModeSpeed
            : this._fastModeModifier = this._fastModeSpeed
        this.fastMode = !this.fastMode
    }

    private toggleRollButton(): void {
        this.rollDisabled = !this.rollDisabled
    }
}