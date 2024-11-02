import { _Entity } from "@/engine/_entities";
import defaultTheme from "@/styles/theme";
import {
  BottomCollider,
  LeftBottomCollider,
  LeftGoalStripe,
  LeftSide,
  LeftTopCollider,
  RightBottomCollider,
  RightGoalStripe,
  RightSide,
  RightTopCollider,
  TopCollider,
} from "./components";

import { IField } from "./types";

interface FieldProps {
  width: number;
  height: number;
  goalSize: number;
}

export class Field extends _Entity implements IField {
  static width: number;
  static height: number;
  static body: Matter.Body[];
  static goalSize: number;
  static colliderSize = 150;
  static strokeWidth = 3;
  static spawn = {
    x: window.screen.width / 2,
    y: window.screen.height / 2,
  };

  constructor(props: FieldProps) {
    const createColliderParams = {
      colliderSize: Field.colliderSize,
      fieldPosition: Field.spawn,
      fieldSize: { width: props.width, height: props.height },
      strokeWidth: Field.strokeWidth,
      goalSize: props.goalSize,
    };
    const topColliderBody = new TopCollider(createColliderParams).body;
    const bottomColliderBody = new BottomCollider(createColliderParams).body;
    const leftTopColliderBody = new LeftTopCollider(createColliderParams).body;
    const leftBottomColliderBody = new LeftBottomCollider(createColliderParams)
      .body;
    const rightTopColliderBody = new RightTopCollider(createColliderParams)
      .body;
    const rightBottomColliderBody = new RightBottomCollider(
      createColliderParams
    ).body;

    const fieldBodies = [
      topColliderBody,
      bottomColliderBody,
      leftTopColliderBody,
      leftBottomColliderBody,
      rightTopColliderBody,
      rightBottomColliderBody,
    ];

    super({
      body: fieldBodies,
    });
    Field.width = props.width;
    Field.height = props.height;
    Field.goalSize = props.goalSize;

    Field.body = fieldBodies;
  }

  render(ctx: CanvasRenderingContext2D) {
    LeftSide.render(ctx);
    LeftGoalStripe.render(ctx);
    RightSide.render(ctx);
    RightGoalStripe.render(ctx);

    const middlePointRadius = Field.goalSize / 20;
    const cornerRadius = Field.goalSize / 5;
    ctx.strokeStyle = defaultTheme.colors.neutral["white/50"];
    ctx.lineWidth = Field.strokeWidth;

    // Top Middle Line
    ctx.beginPath();
    ctx.moveTo(Field.spawn.x, Field.spawn.y - Field.height / 2);
    ctx.lineTo(Field.spawn.x, Field.spawn.y - middlePointRadius);
    ctx.stroke();
    ctx.closePath();

    // Bottom Middle Line
    ctx.beginPath();
    ctx.moveTo(Field.spawn.x, Field.spawn.y + middlePointRadius);
    ctx.lineTo(Field.spawn.x, Field.spawn.y + Field.height / 2);

    ctx.stroke();
    ctx.closePath();

    // Middle Circle
    ctx.beginPath();
    ctx.arc(Field.spawn.x, Field.spawn.y, Field.goalSize, 0, Math.PI * 2);

    ctx.stroke();
    ctx.closePath();

    // Middle Point
    ctx.beginPath();
    ctx.ellipse(
      Field.spawn.x,
      Field.spawn.y,
      Field.goalSize / 20,
      Field.goalSize / 20,
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.closePath();

    // Top Left Corner
    ctx.beginPath();
    ctx.arc(
      Field.spawn.x - Field.width / 2,
      Field.spawn.y - Field.height / 2,
      cornerRadius,
      0,
      Math.PI / 2
    );
    ctx.stroke();
    ctx.closePath();

    // Bottom Left Corner
    ctx.beginPath();
    ctx.arc(
      Field.spawn.x - Field.width / 2,
      Field.spawn.y + Field.height / 2,
      cornerRadius,
      0,
      Math.PI / 2 + Math.PI,
      true
    );
    ctx.stroke();
    ctx.closePath();

    // Top Right Corner
    ctx.beginPath();
    ctx.arc(
      Field.spawn.x + Field.width / 2,
      Field.spawn.y - Field.height / 2,
      cornerRadius,
      Math.PI / 2,
      Math.PI
    );
    ctx.stroke();
    ctx.closePath();

    // Bottom Right Corner
    ctx.beginPath();
    ctx.arc(
      Field.spawn.x + Field.width / 2,
      Field.spawn.y + Field.height / 2,
      cornerRadius,
      Math.PI,
      Math.PI + Math.PI / 2
    );
    ctx.stroke();
    ctx.closePath();

    //Stripes
    const stripesCount = 11;

    for (let index = 1; index < stripesCount; index++) {
      ctx.beginPath();
      ctx.fillStyle = defaultTheme.colors.neutral["white/5"];
      ctx.fillRect(
        (Field.spawn.x - Field.width / 2) * index,
        Field.spawn.y - Field.height / 2,
        Field.width / 20,
        Field.height
      );
      ctx.closePath();
    }
  }
}
