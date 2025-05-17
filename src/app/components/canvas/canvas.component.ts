
import { Component } from '@angular/core';
import { ShapesService } from '../../services/shape.service';
import { Shape, StarShape } from '../../models/shape.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-canvas',
  standalone: true,
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
  imports: [CommonModule],
})
export class CanvasComponent {
  previewShape: Shape | null = null;
  shapes: Shape[] = [];
  mouseX: number = 0;
  mouseY: number = 0;

  constructor(private shapeService: ShapesService) {
    this.shapeService.shapes$.subscribe(s => this.shapes = s);
    this.shapeService.previewShapes$.subscribe(s => {
      this.previewShape = s;
    });
  }

  onMouseMove(event: MouseEvent) {
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
        id: 'preview',
        type: 'rectangle',
        x: cursor.x,
        y: cursor.y,
        width: 100,
        height: 60,
        cornerRadius: 10,
        fill: 'lightblue',
        stroke: 'black',
        strokeWidth: 2,
      };
    } else if (this.previewShape.type === 'star') {
      this.previewShape = {
        id: 'preview',
        type: 'star',
        x: cursor.x,
        y: cursor.y,
        points: 5,
        outerRadius: 40,
        innerRadius: 20,
        fill: 'gold',
        stroke: 'black',
        strokeWidth: 2
      };
    }
  }

  onCanvasClick(event: MouseEvent) {
    if (!this.previewShape) return;

    const newShape = { ...this.previewShape, id: crypto.randomUUID() };
    this.shapeService.addShape(newShape);

    this.previewShape = null;
    this.shapeService.addPreviewShape(null);
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
