import { Component } from '@angular/core';

@Component({
    selector: 'app-game-nav',
    templateUrl: './game-nav.component.html',
    styleUrls: ['./game-nav.component.scss']
})
export class GameNavComponent {
    protected links = ['Dice']
    protected activeLink = this.links[0]
}
