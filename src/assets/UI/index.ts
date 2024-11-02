import { Root } from "@/main";
import { Player } from "../actors";
import { MatchSystem } from "../systems";
import { GameStateSystem } from "../systems/GameState";
import { InGameUI } from "./InGameUI";

export class UI {
  static isGameMenuOpened = false;

  static renderInGameUI(
    timeInSeconds: number,
    redTeamScore: number,
    blueTeamScore: number
  ) {
    Root().render(
      InGameUI({
        timeInSeconds,
        redTeamScore,
        blueTeamScore,
      })
    );
  }

  private static detectOpenOrCloseTheMenu() {
    const isEscapeUp = Player.inputComponent.isButtonUp("Escape");

    if (isEscapeUp) {
      UI.isGameMenuOpened = !UI.isGameMenuOpened;
    }

    if (UI.isGameMenuOpened) {
      this.renderInGameUI(
        MatchSystem.timeInSeconds,
        MatchSystem.redTeam.score,
        MatchSystem.blueTeam.score
      );
      Player.stop();
    } else {
      this.renderInGameUI(
        MatchSystem.timeInSeconds,
        MatchSystem.redTeam.score,
        MatchSystem.blueTeam.score
      );
    }
  }

  static handleCloseGameMenu() {
    UI.isGameMenuOpened = false;
  }

  static update() {
    if (GameStateSystem.isGameStarted) {
      this.detectOpenOrCloseTheMenu();
    }
  }
}
