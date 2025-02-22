import { Component, Input, OnInit } from '@angular/core';
import { GameStateService } from '../game-state.service';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrl: './square.component.scss',
})
export class SquareComponent implements OnInit {
  @Input() value!: 'X' | 'O';
  gameOver: boolean = false;
  constructor(private gamestate: GameStateService) {}

  ngOnInit(): void {
    this.gamestate.gameData.subscribe((res) => {
      if (res.winner.length > res.currentGame) {
        this.gameOver = true;
      }
    });
  }
}
