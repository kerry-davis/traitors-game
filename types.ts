export enum Role {
  FAITHFUL = 'FAITHFUL',
  TRAITOR = 'TRAITOR',
}

export interface Player {
  id: number;
  role: Role;
}

export enum GameStage {
  SETUP = 'SETUP',
  REVEALING = 'REVEALING',
  DISCUSSION = 'DISCUSSION',
  END = 'END',
}