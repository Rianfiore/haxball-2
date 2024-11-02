import { ScoreboardProps } from "./types";

export function Scoreboard({
  timeInSeconds,
  blueTeamScore,
  redTeamScore,
}: ScoreboardProps) {
  const pad = (num: number) => num.toString().padStart(2, "0");
  const minutes = pad(Math.floor(timeInSeconds / 60));
  const seconds = pad(timeInSeconds % 60);

  return (
    <div className="col-start-2 justify-self-center items-center bg-neutral-black-200/50 px-6 py-2 border-b-2 rounded-b-lg w-[70%] flex justify-between gap-2 text-3xl shadow-lg">
      <span className="flex items-center gap-3">
        <div className="bg-support-red w-6 h-6 rounded-sm"></div>
        {`${redTeamScore} - ${blueTeamScore}`}
        <span className="bg-support-blue300 w-6 h-6 rounded-sm"></span>
      </span>

      <span>{`${minutes}:${seconds}`}</span>
    </div>
  );
}
