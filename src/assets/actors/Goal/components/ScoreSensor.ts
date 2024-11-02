import { Ball } from "@/assets/actors";
import Matter, { Bodies } from "matter-js";
import { GoalComponentProps } from "../types";

export class ScoreSensor {
  body: Matter.Body;

  constructor(props: GoalComponentProps) {
    const scoreSensorX =
      props.goalDirection === "LEFT"
        ? props.goalSpawn.x - props.goalHeight / 4 - Ball.radius * 2
        : props.goalSpawn.x + props.goalHeight / 4 + Ball.radius * 2;

    this.body = Bodies.rectangle(
      scoreSensorX,
      props.goalSpawn.y,
      props.goalHeight / 2,
      props.goalHeight,
      {
        label: `${props.goalDirection}_GOAL_SENSOR`,
        isSensor: true,
        isStatic: true,
        collisionFilter: { group: -1 },
      }
    );
  }
}
