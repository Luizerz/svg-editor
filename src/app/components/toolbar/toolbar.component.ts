import { Component } from '@angular/core';
import { ShapesService } from '../../services/shape.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  imports: [CommonModule]
})
export class ToolbarComponent {
  constructor(private shapes: ShapesService) { }

  addRectangle() {
    this.shapes.addPreviewShape(
      {
        id: '',
        type: 'rectangle',
        x: 100,
        y: 100,
        width: 100,
        height: 80,
        cornerRadius: 0,
        fill: '#88f',
        stroke: '#000',
        strokeWidth: 1,
      }
    );
  }

  addStar() {
    this.shapes.addPreviewShape({
      id: '',
      type: 'star',
      x: 200,
      y: 200,
      points: 5,
      outerRadius: 50,
      innerRadius: 25,
      fill: '#fc0',
      stroke: '#000',
      strokeWidth: 1,
    });
  }
}
