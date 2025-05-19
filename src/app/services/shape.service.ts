import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Shape, ShapeType } from '../models/shape.model';
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

  resizeShape(id: string, value: number) {
    console.log('resizing shape', id, value);
    const shape = this.shapesSubject.value.find(s => s.id === id);

    if (shape) {
      if (shape.type === 'rectangle') {
        shape.width = 100 * value;
        shape.height = 60 * value;
      } else {
        shape.outerRadius = 50 * value;
        shape.innerRadius = 25 * value;
      }
    }
  }

  getShapeById(id: string) {
    return this.shapesSubject.value.find(shape => shape.id === id);
  }
  deleteShape(id: string) {
    const updatedShapes = this.shapesSubject.value.filter(shape => shape.id !== id);
    this.shapesSubject.next(updatedShapes);
  }
}
