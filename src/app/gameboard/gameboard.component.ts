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
  audio: HTMLAudioElement | null = null;

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
    this.placeTileSound();
    if (!this.squares[index]) {
      this.squares[index] = this.currentPlayer;
      this.isXNext = !this.isXNext;
    }
    this.winner = this.getWinner();

    if (this.winner) {
      this.playWinningEffect();
      this.updateGameState({ gameOn: this.gameOn, winner: this.winner });
    }
  }

  playWinningEffect() {
    if (this.audio && !this.audio.paused) {
      return;
    }

    this.audio = new Audio('/audio/HaramMusic.mp3');
    this.audio.load();

    this.audio
      .play()
      .catch((error) => console.error('Audio play failed:', error));
    this.audio.onended = () => {
      this.gameOn = false;
      console.log('Winning music finished, game reset.');
    };
  }

  placeTileSound() {
    const audioFile = this.tileToggle
      ? '/audio/tile-1.mp3'
      : '/audio/tile-2.mp3';
    const audio = new Audio(audioFile);
    audio.load();
    audio.play().catch((error) => console.error('Audio play failed:', error));
    this.tileToggle = !this.tileToggle;
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

  trackByFn(index: number, item: any): number {
    return index;
  }
}
