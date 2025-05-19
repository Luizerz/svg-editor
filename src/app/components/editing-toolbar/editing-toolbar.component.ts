import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Shape } from '../../models/shape.model';
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

  @Input() selectedShape: Shape | null = null;
  @Input() mouseX: number = 0;
  @Input() mouseY: number = 0;
  @Output() resize = new EventEmitter<number>();
  @Output() delete = new EventEmitter<void>();
  @Output() move = new EventEmitter<void>();
  @Output() starPoints = new EventEmitter<number>();
  value = 1;
  points = 3;

  onResize() {
    this.resize.emit(this.value);
  }
  onDelete() {
    this.delete.emit();
  }
  onMove() {
    this.move.emit();
  }

  onStarPointsDown() {
    this.points -= 1
    if (this.points <= 3) {
      this.points = 3
      this.starPoints.emit(this.points)
    }
    this.starPoints.emit(this.points)
  }
  onStarPointsRaise() {
    this.points += 1
    this.starPoints.emit(this.points)
  }
}
