import { SizeType } from "@/engine/types";
import { Position } from "@/engine/utils";

export class IField {
  static width: number;
  static height: number;
  static body: Matter.Body[];
  static goalSize: number;
  static colliderSize = 150;
  static strokeWidth = 3;
  static spawn = Position;
}

export interface CreateFieldColliderParams {
  fieldPosition: Position;
  fieldSize: SizeType;
  colliderSize: number;
  strokeWidth: number;
  goalSize: number;
}
