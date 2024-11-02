import { Player } from "@/assets/actors";

export type TeamType = {
  players: Player[];
  score: number;
};

export interface MatchSystemProps {
  redTeam: Player[];
  blueTeam: Player[];
}

export class IMatchSystem {
  static redTeam: TeamType;
  static blueTeam: TeamType;
  static timeInSeconds: number;
}
