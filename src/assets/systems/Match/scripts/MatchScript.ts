import { Game } from "@/assets/Game";
import { UI } from "@/assets/UI";
import { Ball, Player } from "@/assets/actors";
import { Script } from "@/engine/utils";
import { Collision } from "matter-js";
import { MatchSystem } from "../../Match";
import { TeamType } from "../types";

export class MatchScript extends Script {
  redTeam = MatchSystem.redTeam;
  blueTeam = MatchSystem.blueTeam;
  isGoal = false;
  isRenderedInGameMenu = false;

  constructor() {
    super();

    this.start();
  }

  start() {
    super.start();
  }

  update(timestamp: number): void {
    super.update(timestamp);

    this.updateScoreboardOnGoalOrEverySecond(timestamp);

    if (this.isGoal === false) {
      this.checkIfTeamScores(this.redTeam);
      this.checkIfTeamScores(this.blueTeam);
    }
  }

  updateScoreboardOnGoalOrEverySecond(timestamp: number) {
    const timeInSeconds = Math.floor(timestamp / 1000);
    const isEverySecond = timeInSeconds !== MatchSystem.timeInSeconds;

    if (!this.isRenderedInGameMenu) {
      UI.renderInGameUI(
        MatchSystem.timeInSeconds,
        MatchSystem.redTeam.score,
        MatchSystem.blueTeam.score
      );

      this.isRenderedInGameMenu = true;
    }

    if (isEverySecond) {
      MatchSystem.timeInSeconds = timeInSeconds;
      UI.renderInGameUI(
        MatchSystem.timeInSeconds,
        MatchSystem.redTeam.score,
        MatchSystem.blueTeam.score
      );
    }

    if (this.isGoal) {
      UI.renderInGameUI(
        MatchSystem.timeInSeconds,
        MatchSystem.redTeam.score,
        MatchSystem.blueTeam.score
      );
    }
  }

  checkIfTeamScores(team: TeamType) {
    const opponentTeamGoal =
      team === this.redTeam ? Game.rightGoal : Game.leftGoal;

    const hasBallTouchedTheBlueGoal = Collision.collides(
      opponentTeamGoal.scoreSensor.body,
      Ball.body
    );

    if (hasBallTouchedTheBlueGoal) {
      this.isGoal = true;
      this.addScore(team);
      this.kickoffGame();
      UI.renderInGameUI(
        MatchSystem.timeInSeconds,
        MatchSystem.redTeam.score,
        MatchSystem.blueTeam.score
      );
    }
  }

  addScore(team: TeamType) {
    team.score += 1;
  }

  kickoffGame() {
    this.isGoal = false;

    Ball.reset();
    Player.reset();

    //Congelar o tempo aqui
  }
}
