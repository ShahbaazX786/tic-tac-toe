import { Injectable } from '@angular/core';
import { GameStateService } from './game-state.service';

@Injectable({
  providedIn: 'root',
})
export class GameSoundService {
  tileToggle = false;
  audio: HTMLAudioElement | null = null;

  constructor(private gamestate: GameStateService) {}

  placeTileSound() {
    const audioFile = this.tileToggle
      ? '/audio/tile-1.mp3'
      : '/audio/tile-2.mp3';
    const audio = new Audio(audioFile);
    audio.load();
    audio.play().catch((error) => console.error('Audio play failed:', error));
    this.tileToggle = !this.tileToggle;
  }

  playDrawEffect() {
    this.audio = new Audio('/audio/error.mp3');
    this.audio.load();
    this.audio
      .play()
      .catch((error) => console.error('Audio play failed:', error));
    this.audio.onended = () => {
      console.log('Game Draw, game reset.');
      const currentData = this.gamestate.gameData.value;
      this.gamestate.gameData.next({
        ...currentData,
        gameOn: false,
      });
    };
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
      const currentData = this.gamestate.gameData.value;
      this.gamestate.gameData.next({
        ...currentData,
        gameOn: false,
      });
      console.log('Winning music finished, game reset.');
    };
  }
}
