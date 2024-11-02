import { createRoot } from "react-dom/client";
import { Game } from "./assets/Game";

const game = new Game();
game.start();

export const root = createRoot(document.getElementById("root")!);

export function Root() {
  return root;
}
