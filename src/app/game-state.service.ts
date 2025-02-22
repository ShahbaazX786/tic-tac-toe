import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameStateType, updateGameStateType } from './types';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  gameData = new BehaviorSubject({
    gameOn: false,
    winner: [],
    currentGame: 0,
    highScore: 0,
  });

  constructor() {}

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
}
