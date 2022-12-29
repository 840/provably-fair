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
    private readonly slotSize = 30
    private readonly reelSize = 300
    private readonly reelCountPerGroup = 9
    private readonly fastModeSpeed = 1
    private readonly normalModeSpeed = 4
    
    public readonly slotNumbers = [...Array(10).keys()]
    public readonly reelCountPerGroupArray = [...Array(this.reelCountPerGroup + 2).keys()]
    
    public roll: string

    public fastMode = false
    private fastModeModifier = this.normalModeSpeed

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
        const rollNumber = Math.ceil(this.gameService.playGame(1000 * this.fastModeModifier).roll * 100).toString()
        this.roll = rollNumber.padStart(4, '0')
        this.playAnim()
    }

    async playAnim(): Promise<void> {
        this.slotsAnim1 = this.playAnimStyle(4, parseInt(this.roll[0]))
        this.slotsAnim2 = this.playAnimStyle(3, parseInt(this.roll[1]))
        this.slotsAnim3 = this.playAnimStyle(2, parseInt(this.roll[2]))
        this.slotsAnim4 = this.playAnimStyle(1, parseInt(this.roll[3]))
        
        this.toggleRollButton()
        await new Promise(resolve => setTimeout(resolve, 1000 * this.fastModeModifier))
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
        this.fastMode ? duration = this.fastModeSpeed : duration
        const translateModifier = this.fastMode
            ? `translateY(-${number * this.slotSize}px)`
            : `translateY(-${number * this.slotSize - (duration - this.normalModeSpeed) * this.reelSize}px)`
        return {
            'transitionDuration': `${duration}s`,
            'transform': translateModifier
        }
    }

    resetAnimStyle(number: number): SlotAnimStyle {
        return {
            'transitionDuration': `0s`,
            'transform': `translateY(-${number * this.slotSize + this.reelSize * this.reelCountPerGroup}px)`
        }
    }

    protected toggleFastMode(): void {
        this.fastMode
            ? this.fastModeModifier = this.normalModeSpeed
            : this.fastModeModifier = this.fastModeSpeed
        this.fastMode = !this.fastMode
    }

    private toggleRollButton(): void {
        this.rollDisabled = !this.rollDisabled
    }
}