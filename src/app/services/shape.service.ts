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

  resizeShape(id: string, width: number, height: number) {
    const shape = this.shapesSubject.value.find(s => s.id === id);
    this.shapesSubject.value.filter(s => s.id !== id);
    if (shape) {
      if (shape.type === 'rectangle') {
        const updatedShape = { ...shape, width: shape.width + width, height: shape.height + height };
        const updatedShapes = this.shapesSubject.value.map(s => s.id === id ? updatedShape : s);
        this.shapesSubject.next(updatedShapes);
      } else {
        const updatedShape = { ...shape, outerRadius: shape.outerRadius + width, innerRadius: shape.innerRadius + height };
        const updatedShapes = this.shapesSubject.value.map(s => s.id === id ? updatedShape : s);
        this.shapesSubject.next(updatedShapes);
      }
    }
  }


  deleteShape(id: string) {
    const updatedShapes = this.shapesSubject.value.filter(shape => shape.id !== id);
    this.shapesSubject.next(updatedShapes);
  }
}
