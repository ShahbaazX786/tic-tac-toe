export type updateGameStateType = {
  gameOn?: boolean;
  winner?: string;
  currentGame?: number;
  highScore?: number;
};

export type GameStateType = {
  gameOn?: boolean;
  winners?: string[];
  currentGame?: number;
  highScore?: number;
};
