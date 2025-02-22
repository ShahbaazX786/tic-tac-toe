import { Component, OnInit } from '@angular/core';
import { GameSoundService } from '../game-sound.service';
import { GameStateService } from '../game-state.service';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrl: './gameboard.component.scss',
})
export class GameboardComponent implements OnInit {
  squares: any[] = [];
  isXNext: boolean = false;
  winner: string = '';
  gameOn: boolean = false;

  constructor(
    private gamestate: GameStateService,
    private gamesound: GameSoundService
  ) {}

  ngOnInit(): void {
    this.gamestate.gameData.subscribe((res) => {
      this.gameOn = res.gameOn;
    });
  }

  beginNewGame() {
    this.gameOn = true;
    this.squares = Array(9).fill(null);
    this.winner = '';
    this.isXNext = Math.random() < 0.5;
    this.gamestate.updateGameState({ gameOn: this.gameOn });
  }

  get currentPlayer() {
    return this.isXNext ? 'X' : 'O';
  }

  makeAMove(index: number) {
    this.gamesound.placeTileSound();
    if (!this.squares[index]) {
      this.squares[index] = this.currentPlayer;
      this.isXNext = !this.isXNext;
    }
    this.winner = this.getWinner();

    if (this.winner) {
      this.gamesound.playWinningEffect();
      this.gamestate.updateGameState({
        gameOn: this.gameOn,
        winner: this.winner,
      });
    } else if (this.squares.every((square) => square !== null)) {
      this.gamesound.playDrawEffect();
    }
  }

  trackByFn(index: number, item: any): number {
    return index;
  }

  getWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let [a, b, c] of lines) {
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }
}
