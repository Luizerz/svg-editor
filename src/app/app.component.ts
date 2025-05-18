import { Component } from '@angular/core';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { EditingToolbarComponent } from './components/editing-toolbar/editing-toolbar.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [ToolbarComponent, CanvasComponent],
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
