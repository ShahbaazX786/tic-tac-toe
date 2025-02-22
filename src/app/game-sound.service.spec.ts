import { TestBed } from '@angular/core/testing';

import { GameSoundService } from './game-sound.service';

describe('GameSoundService', () => {
  let service: GameSoundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameSoundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
