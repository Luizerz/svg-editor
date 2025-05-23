import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ShapeType } from '../../models/shape.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-editing-toolbar',
  imports: [CommonModule, MatIconModule, FormsModule, MatInputModule, MatSliderModule, MatButtonModule],
  templateUrl: './editing-toolbar.component.html',
  standalone: true,
  styleUrl: './editing-toolbar.component.css'
})
export class EditingToolbarComponent {

  @Input() shapeType: ShapeType | undefined = undefined;
  @Input() shapeStarPoints: number | null = 5;
  @Input() shapeFillColor: string = '';
  @Input() shapeStrokeColor: string = '';
  @Input() shapeStrokeWidth: number = 1;
  @Input() shapeCornerRadius: number | null = 0;
  @Input() mouseX: number = 0;
  @Input() mouseY: number = 0;
  @Input() shapeSize: [width: number, height: number] = [100, 50];
  @Output() resize = new EventEmitter<[width: number, height: number]>();
  @Output() delete = new EventEmitter<void>();
  @Output() move = new EventEmitter<void>();
  @Output() check = new EventEmitter<void>();
  @Output() starPoints = new EventEmitter<number>();
  @Output() fill = new EventEmitter<string>();
  @Output() stroke = new EventEmitter<string>();
  @Output() strokeWidth = new EventEmitter<number>();
  @Output() cornerRadius = new EventEmitter<number>();


  onResize() {
    this.resize.emit([this.shapeSize[0], this.shapeSize[1]]);
  }
  onDelete() {
    this.delete.emit();
  }
  onMove() {
    this.move.emit();
  }

  onFill() {
    this.fill.emit(this.shapeFillColor);
  }

  onStroke() {
    this.stroke.emit(this.shapeStrokeColor);
  }

  onStrokeWidth() {
    this.strokeWidth.emit(this.shapeStrokeWidth)
  }

  onCornerRadius() {
    if(!this.shapeCornerRadius) return;
    this.cornerRadius.emit(this.shapeCornerRadius)
  }

  onStarPointsDown() {
    if (this.shapeStarPoints === null) return
    this.shapeStarPoints -= 1
    if (this.shapeStarPoints <= 3) {
      this.shapeStarPoints = 3
      this.starPoints.emit(this.shapeStarPoints)
    }
    this.starPoints.emit(this.shapeStarPoints)
  }
  onStarPointsRaise() {
    if (this.shapeStarPoints === null) return
    this.shapeStarPoints += 1
    this.starPoints.emit(this.shapeStarPoints)
  }

  onStrokeWidthDown() {
    this.shapeStrokeWidth -= 1;
    if (this.shapeStrokeWidth < 1) {
      this.shapeStrokeWidth = 1
      this.strokeWidth.emit(this.shapeStrokeWidth)
    }
    this.strokeWidth.emit(this.shapeStrokeWidth)
  }
  onStrokeWidthRaise() {
    this.shapeStrokeWidth += 1
    this.strokeWidth.emit(this.shapeStrokeWidth)
  }
  onCheck() {
    this.check.emit()
  }

}
