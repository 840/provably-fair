import { Component } from '@angular/core';

@Component({
    selector: 'app-game-nav',
    templateUrl: './game-nav.component.html',
    styleUrls: ['./game-nav.component.scss']
})
export class GameNavComponent {
    links = ['Roll', 'Second', 'Third']
    activeLink = this.links[0]
}
