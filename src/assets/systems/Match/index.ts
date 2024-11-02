import { _System } from "@/engine/_systems";
import { MatchScript } from "./scripts/MatchScript";
import { IMatchSystem, MatchSystemProps, TeamType } from "./types";

export class MatchSystem extends _System implements IMatchSystem {
  static timeInSeconds: number;
  static redTeam: TeamType;
  static blueTeam: TeamType;

  constructor(props: MatchSystemProps) {
    super([...props.redTeam, ...props.blueTeam]);

    MatchSystem.redTeam = {
      players: props.redTeam,
      score: 0,
    };
    MatchSystem.blueTeam = {
      players: props.blueTeam,
      score: 0,
    };

    MatchSystem.timeInSeconds = 0;

    new MatchScript();
  }

  update() {}
}
