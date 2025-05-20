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
  constructor(private shapesService: ShapesService) { }

  addRectangle() {
    this.shapesService.addPreviewShape(
      {
        id: '',
        type: 'rectangle',
        x: 100,
        y: 100,
        width: 100,
        height: 60,
        cornerRadius: 0,
        fill: '#ffffff',
        stroke: '#000000',
        strokeWidth: 2,
        strokeOpacity: 1,
      }
    );
  }

  addStar() {
    this.shapesService.addPreviewShape({
      id: '',
      type: 'star',
      x: 200,
      y: 200,
      points: 5,
      outerRadius: 50,
      innerRadius: 25,
      fill: '#ffffff',
      stroke: '#000000',
      strokeWidth: 2,
      strokeOpacity: 1,
    });
  }
}
