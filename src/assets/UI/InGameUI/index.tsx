import { UI } from "..";
import { Scoreboard, ToolsMenu } from "./components";
import { MenuOptions } from "./components/MenuOptions";
import { InGameUIProps } from "./types";

export function InGameUI(props: InGameUIProps) {
  return (
    <div className="self-start grid grid-cols-3 w-full px-12">
      <Scoreboard {...props} />
      <ToolsMenu />
      {UI.isGameMenuOpened && <MenuOptions />}
    </div>
  );
}
