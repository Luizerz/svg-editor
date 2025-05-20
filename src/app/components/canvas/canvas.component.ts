
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
  selectedShape: Shape | null = null;
  shapes: Shape[] = [];
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
    this.onShapeClick(shape!, event);
  }

  onShapeClick(shape: Shape, event?: MouseEvent, ) {
    if (this.selectedShape) {
      if (this.selectedShape.id === shape.id) {
        this.shapeService.changeShapeOpacity(this.selectedShape.id, 1);
        this.selectedShape = null
      } else {
        this.shapeService.changeShapeOpacity(this.selectedShape.id, 1);
        this.selectedShape = shape
        this.shapeService.changeShapeOpacity(this.selectedShape.id, 0.5);
      }
    } else {
      this.selectedShape = shape
      this.shapeService.changeShapeOpacity(this.selectedShape.id, 0.5);
    }
    if (!event) return;
    this.selectedShapeX = event.pageX;
    this.selectedShapeY = event.pageY;
  }

  onDeleteShape() {
    if (!this.selectedShape) return;
    this.shapeService.deleteShape(this.selectedShape.id);
    this.selectedShape = null;
  }

  onEditingFinished() {
    if (!this.selectedShape) return;
    this.onShapeClick(this.selectedShape)
  }

  onResizeShape(value: [width: number, height: number]) {
    if (!this.selectedShape) return;
    this.shapeService.resizeShape(this.selectedShape.id, value);
  }

  onFillColorShape(value: string) {
    if (!this.selectedShape) return;
    this.shapeService.changeShapeFillColor(this.selectedShape.id, value)
  }

  onStrokeColorShape(value: string) {
    if (!this.selectedShape) return;
    console.log(value)
    this.shapeService.changeShapeStrokeColor(this.selectedShape.id, value)
  }

  onStrokeWidthShape(value: number) {
    if (!this.selectedShape) return;
    this.shapeService.changeShapeStrokeWidth(this.selectedShape.id, value)
  }

  onCornerRadiusShape(value: number) {
    if (!this.selectedShape) return;
    this.shapeService.changeShapeCornerRadius(this.selectedShape.id, value)
  }

  onStarPointsChange(value: number) {
    if (!this.selectedShape) return;
    this.shapeService.changeStarPoints(this.selectedShape.id, value)
  }

  onMoveShape() {
    if (!this.selectedShape) return;
    this.previewShape = { ...this.selectedShape };
    this.shapeService.addPreviewShape(this.previewShape);
    this.shapeService.deleteShape(this.selectedShape.id);
    this.selectedShape = null;
  }
  canvasGenerateStarPoints(shape: StarShape): string {
    return this.shapeService.generateStarPoints(shape)
  }
}
