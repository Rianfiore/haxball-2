import { _Entity } from "@/engine/_entities";
import { Position } from "@/engine/utils";
import {
  BackSide,
  LeftLineToPin,
  LeftPin,
  LeftPost,
  LeftSide,
  RightLineToPin,
  RightPin,
  RightPost,
  RightSide,
  ScoreSensor,
} from "./components";
import { GoalDirection, GoalProps } from "./types";

export class Goal extends _Entity {
  static body: Matter.Body[];
  static postRadius = 8;
  static pin = {
    radius: 6,
    distanceFromPost: 70,
  };
  backSide: BackSide;
  leftPost: LeftPost;
  leftSide: LeftSide;
  leftLineToPin: LeftLineToPin;
  leftPin: LeftPin;
  rightPost: RightPost;
  rightSide: RightSide;
  rightLineToPin: RightLineToPin;
  rightPin: RightPin;
  goalDirection: GoalDirection;
  height: number;
  spawn: Position;
  scoreSensor: ScoreSensor;

  constructor(props: GoalProps) {
    const goalComponentParams = {
      goalDirection: props.goalDirection,
      goalSpawn: props.position,
      goalHeight: props.height,
      postRadius: Goal.postRadius,
      pinDistanceFromPost: Goal.pin.distanceFromPost,
      pinRadius: Goal.pin.radius,
    };
    const scoreSensor = new ScoreSensor(goalComponentParams);
    const backSide = new BackSide(goalComponentParams);
    const leftPost = new LeftPost(goalComponentParams);
    const leftSide = new LeftSide(goalComponentParams);
    const leftLineToPin = new LeftLineToPin(goalComponentParams);
    const leftPin = new LeftPin(goalComponentParams);
    const rightPost = new RightPost(goalComponentParams);
    const rightSide = new RightSide(goalComponentParams);
    const rightLineToPin = new RightLineToPin(goalComponentParams);
    const rightPin = new RightPin(goalComponentParams);

    const goalBodies = [
      backSide.body,
      leftPost.body,
      leftPin.body,
      rightPost.body,
      rightPin.body,
      scoreSensor.body,
    ];
    super({ body: goalBodies });

    this.scoreSensor = scoreSensor;
    this.backSide = backSide;
    this.leftPost = leftPost;
    this.leftSide = leftSide;
    this.leftLineToPin = leftLineToPin;
    this.leftPin = leftPin;
    this.rightPost = rightPost;
    this.rightSide = rightSide;
    this.rightLineToPin = rightLineToPin;
    this.rightPin = rightPin;
    this.height = props.height;
    this.goalDirection = props.goalDirection;
    this.spawn = props.position;
  }

  render(ctx: CanvasRenderingContext2D) {
    this.backSide.render(ctx);
    this.leftPost.render(ctx);
    this.leftSide.render(ctx);
    this.leftLineToPin.render(ctx);
    this.leftPin.render(ctx);
    this.rightPost.render(ctx);
    this.rightSide.render(ctx);
    this.rightLineToPin.render(ctx);
    this.rightPin.render(ctx);
  }
}
