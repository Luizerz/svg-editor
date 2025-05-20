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
  imports: [CommonModule, MatButtonModule, MatIconModule, MatSliderModule, FormsModule, MatInputModule],
  templateUrl: './editing-toolbar.component.html',
  standalone: true,
  styleUrl: './editing-toolbar.component.css'
})
export class EditingToolbarComponent {

  @Input() shapeType: ShapeType | undefined = undefined;
  @Input() shapeStarPoints: number | null = 5;
  @Input() mouseX: number = 0;
  @Input() mouseY: number = 0;
  @Input() shapeSize: [width: number, height: number] = [100, 50];
  @Output() resize = new EventEmitter<[width: number, height: number]>();
  @Output() delete = new EventEmitter<void>();
  @Output() move = new EventEmitter<void>();
  @Output() starPoints = new EventEmitter<number>();


  onResize() {
    this.resize.emit([this.shapeSize[0], this.shapeSize[1]]);
  }
  onDelete() {
    this.delete.emit();
  }
  onMove() {
    this.move.emit();
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
}
