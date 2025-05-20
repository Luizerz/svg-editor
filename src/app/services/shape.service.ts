import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Shape, StarShape } from '../models/shape.model';
import { v4 as uuid } from 'uuid';

@Injectable({ providedIn: 'root' })
export class ShapesService {
  private shapesSubject = new BehaviorSubject<Shape[]>([]);
  private previewShapesSubject = new BehaviorSubject<Shape | null>(null);
  previewShapes$ = this.previewShapesSubject.asObservable();
  shapes$ = this.shapesSubject.asObservable();


  addPreviewShape(shape: Shape | null) {
    if (shape) {
      this.previewShapesSubject.next({ ...shape, id: uuid() });
    } else {
      this.previewShapesSubject.next(null);
    }
  }

  addShape(shape: Shape) {
    const current = this.shapesSubject.value;
    this.shapesSubject.next([...current, { ...shape }]);
  }

  getShapeById(id: string) {
    return this.shapesSubject.value.find(shape => shape.id === id);
  }
   
  deleteShape(id: string) {
    const updatedShapes = this.shapesSubject.value.filter(shape => shape.id !== id);
    this.shapesSubject.next(updatedShapes);
  }

  resizeShape(id: string, value: [width: number, height: number]) {
    const shape = this.getShapeById(id)

    if (shape) {
      if (shape.type === 'rectangle') {
        shape.width = value[0];
        shape.height = value[1];
      } else {
        shape.outerRadius = value[0];
        shape.innerRadius = value[1];
      }
    }
  }

  changeShapeFillColor(id: string, color: string) {
    const shape = this.getShapeById(id) 
    if(shape) {
      shape.fill = color
    }
  }

  changeShapeStrokeColor(id: string, color: string) {
    const shape = this.getShapeById(id) 
    if(shape) {
      shape.stroke = color
    }
  }

  changeShapeStrokeWidth(id: string, width: number) {
    const shape = this.getShapeById(id)
    if(shape) {
      shape.strokeWidth = width
    }
  }

  changeStarPoints(id: string, value: number) {
    const shape = this.getShapeById(id)
    if (shape?.type == 'star') {
      shape.points = value
    }
  }

  generateStarPoints(shape: StarShape): string {
    const { x, y, points, outerRadius, innerRadius } = shape;
    const step = Math.PI / points;
    const coords: string[] = [];

    for (let i = 0; i < 2 * points; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = i * step;
      const px = x + radius * Math.cos(angle);
      const py = y + radius * Math.sin(angle);
      coords.push(`${px},${py}`);
    }
    return coords.join(' ');
  }

 
}
