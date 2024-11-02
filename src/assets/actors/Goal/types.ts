import { DirectionType } from "@/engine/types";
import { Position } from "@/engine/utils";

export type GoalDirection = Extract<DirectionType, "LEFT" | "RIGHT">;

export interface GoalProps {
  goalDirection: GoalDirection;
  height: number;
  position: Position;
}

export interface GoalComponentProps {
  goalDirection: GoalDirection;
  goalSpawn: Position;
  goalHeight: number;
  postRadius: number;
  pinDistanceFromPost: number;
  pinRadius: number;
}
