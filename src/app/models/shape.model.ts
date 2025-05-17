export type ShapeType = 'rectangle' | 'star';

export interface BaseShape {
  id: string;
  type: ShapeType;
  x: number;
  y: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
}

export interface RectangleShape extends BaseShape {
  type: 'rectangle';
  width: number;
  height: number;
  cornerRadius: number;
}

export interface StarShape extends BaseShape {
  type: 'star';
  points: number;
  outerRadius: number;
  innerRadius: number;
}

export type Shape = RectangleShape | StarShape;
