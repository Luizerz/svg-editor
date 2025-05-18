import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Shape } from '../../models/shape.model';

@Component({
  selector: 'app-editing-toolbar',
  imports: [CommonModule],
  templateUrl: './editing-toolbar.component.html',
  standalone: true,
  styleUrl: './editing-toolbar.component.css'
})
export class EditingToolbarComponent {

  @Input() selectedShape: Shape | null = null;
  @Input() mouseX: number = 0;
  @Input() mouseY: number = 0;
  @Output() resize = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() move = new EventEmitter<void>();

  onResize() {
    this.resize.emit();
  }
  onDelete() {
    this.delete.emit();
  }
  onMove() {
    this.move.emit();
  }
}
