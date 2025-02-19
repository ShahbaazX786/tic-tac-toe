import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SquareComponent } from '../square/square.component';

@Component({
  selector: 'app-gameboard',
  standalone: true,
  imports: [CommonModule, SquareComponent],
  templateUrl: './gameboard.component.html',
  styleUrl: './gameboard.component.scss',
})
export class GameboardComponent implements OnInit {
  squares: any[] = [];
  isXNext: boolean = false;
  winner: string = '';

  ngOnInit(): void {
    this.beginNewGame();
  }

  beginNewGame() {
    this.squares = Array(9).fill(null);
    this.winner = '';
    this.isXNext = true;
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
}
