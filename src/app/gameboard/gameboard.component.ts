import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameStateType, updateGameStateType } from './../types';

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
  gameData = new BehaviorSubject({});
  tileToggle = false;

  ngOnInit(): void {
    this.initializeGame();
  }

  initializeGame() {
    this.gameData.next({
      gameOn: false,
      winner: [],
      currentGame: 0,
      highScore: 0,
    });
  }

  beginNewGame() {
    this.gameOn = true;
    this.squares = Array(9).fill(null);
    this.winner = '';
    this.isXNext = Math.random() < 0.5;
    this.updateGameState({ gameOn: this.gameOn });
  }

  updateGameState({
    gameOn,
    winner,
    currentGame,
    highScore,
  }: updateGameStateType) {
    const currentData: GameStateType =
      this.gameData.getValue() as GameStateType;

    const updatedWinners = winner
      ? currentData?.winners!.push(winner)
      : currentData.winners;

    this.gameData.next({
      gameOn,
      winner: updatedWinners,
      currentGame,
      highScore,
    });
  }

  get currentPlayer() {
    return this.isXNext ? 'X' : 'O';
  }

  makeAMove(index: number) {
    if (!this.squares[index]) {
      this.squares[index] = this.currentPlayer;
      this.isXNext = !this.isXNext;
    }
    this.winner = this.getWinner();
  }

  getWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
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

  trackByFn(index: number, item: any): number {
    return index;
  }
}
