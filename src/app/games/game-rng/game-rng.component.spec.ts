import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRngComponent } from './game-rng.component';

describe('GameRngComponent', () => {
    let component: GameRngComponent;
    let fixture: ComponentFixture<GameRngComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ GameRngComponent ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(GameRngComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
