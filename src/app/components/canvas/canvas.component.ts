
import { Component } from '@angular/core';
import { ShapesService } from '../../services/shape.service';
import { Shape, StarShape } from '../../models/shape.model';
import { CommonModule } from '@angular/common';
import { EditingToolbarComponent } from '../editing-toolbar/editing-toolbar.component';

@Component({
  selector: 'app-canvas',
  standalone: true,
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
  imports: [CommonModule, EditingToolbarComponent],
})
export class CanvasComponent {
  previewShape: Shape | null = null;
  shapes: Shape[] = [];
  selectedShape: Shape | null = null;
  mouseX: number = 0;
  mouseY: number = 0;
  selectedShapeX: number = 0;
  selectedShapeY: number = 0;

  constructor(private shapeService: ShapesService) {
    this.shapeService.shapes$.subscribe(s => this.shapes = s);
    this.shapeService.previewShapes$.subscribe(s => {
      this.previewShape = s;
    });
  }

  onCanvasMouseMove(event: MouseEvent) {
    const svg = (event.target as SVGElement).closest('svg');
    if (!svg || !this.previewShape) return;
    const pt = svg.createSVGPoint();
    pt.x = event.clientX;
    pt.y = event.clientY;
    const cursor = pt.matrixTransform(svg.getScreenCTM()?.inverse());

    this.mouseX = cursor.x;
    this.mouseY = cursor.y;


    if (this.previewShape.type === 'rectangle') {
      this.previewShape = {
        ...this.previewShape,
        x: cursor.x,
        y: cursor.y,

      };
    } else if (this.previewShape.type === 'star') {
      this.previewShape = {
        ...this.previewShape,
        x: cursor.x,
        y: cursor.y,

      };
    }
  }

  onCanvasClick(event: MouseEvent) {
    if (!this.previewShape) return;
    const newShape = { ...this.previewShape };
    this.shapeService.addShape(newShape);
    this.previewShape = null;
    this.shapeService.addPreviewShape(null);
    const shape = this.shapeService.getShapeById(newShape.id);
    this.onShapeClick(event, shape!);
  }

  onShapeClick(event: MouseEvent, shape: Shape) {
    if (this.selectedShape?.id === shape.id) {
      this.selectedShape = null;
      return;
    }

    this.selectedShapeX = event.pageX;
    this.selectedShapeY = event.pageY;
    this.selectedShape = shape;
  }

  onDeleteShape() {
    if (!this.selectedShape) return;
    this.shapeService.deleteShape(this.selectedShape.id);
    this.selectedShape = null;
  }

  onResizeShape(value: number) {
    if (!this.selectedShape) return;
    this.shapeService.resizeShape(this.selectedShape.id, value);

  }

  onMoveShape() {
    if (!this.selectedShape) return;
    this.previewShape = { ...this.selectedShape };
    this.shapeService.addPreviewShape(this.previewShape);
    this.shapeService.deleteShape(this.selectedShape.id);
    this.selectedShape = null;
  }

  canvasGenerateStarPoints(shape: StarShape): string {
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
