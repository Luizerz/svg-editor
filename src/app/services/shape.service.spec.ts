import { ShapesService } from './shape.service';
import { RectangleShape, Shape, StarShape } from '../models/shape.model';

describe('ShapesService', () => {
  let service: ShapesService;

  beforeEach(() => {
    service = new ShapesService();
  });

  it('should add a preview shape with a new id', (done) => {
    const shape: RectangleShape = {
      id: '',
      type: 'rectangle',
      x: 10, y: 10,
      width: 100, height: 100,
      cornerRadius: 0,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 2,
      strokeOpacity: 1
    };

    service.previewShapes$.subscribe(preview => {
      if (preview) {
        expect(preview.id).not.toBe('');
        expect(preview.type).toBe('rectangle');
        done();
      }
    });

    service.addPreviewShape(shape);
  });

  it('should add and retrieve a shape by id', () => {
    const shape: RectangleShape = {
      id: '123',
      type: 'rectangle',
      x: 0, y: 0,
      width: 50, height: 50,
      cornerRadius: 5,
      fill: 'blue',
      stroke: 'black',
      strokeWidth: 1,
      strokeOpacity: 1
    };

    service.addShape(shape);
    const result = service.getShapeById('123');
    expect(result).toEqual(shape);
  });

  it('should delete a shape by id', () => {
    const shape: RectangleShape = {
      id: 'del',
      type: 'rectangle',
      x: 0, y: 0,
      width: 20, height: 20,
      cornerRadius: 0,
      fill: 'green',
      stroke: 'black',
      strokeWidth: 1,
      strokeOpacity: 1
    };

    service.addShape(shape);
    service.deleteShape('del');
    expect(service.getShapeById('del')).toBeUndefined();
  });

  it('should resize a rectangle shape', () => {
    const shape: RectangleShape = {
      id: 'resize',
      type: 'rectangle',
      x: 0, y: 0,
      width: 10, height: 10,
      cornerRadius: 0,
      fill: 'gray',
      stroke: 'black',
      strokeWidth: 1,
      strokeOpacity: 1
    };

    service.addShape(shape);
    service.resizeShape('resize', [100, 200]);
    const updated = service.getShapeById('resize') as RectangleShape;
    expect(updated.width).toBe(100);
    expect(updated.height).toBe(200);
  });

  it('should change fill color', () => {
    const shape: RectangleShape = { ...createBaseRect(), id: 'filltest' };
    service.addShape(shape);
    service.changeShapeFillColor('filltest', 'purple');
    expect(service.getShapeById('filltest')!.fill).toBe('purple');
  });

  it('should change stroke color', () => {
    const shape: RectangleShape = { ...createBaseRect(), id: 'stroketest' };
    service.addShape(shape);
    service.changeShapeStrokeColor('stroketest', 'green');
    expect(service.getShapeById('stroketest')!.stroke).toBe('green');
  });

  it('should change stroke width', () => {
    const shape: RectangleShape = { ...createBaseRect(), id: 'widthtest' };
    service.addShape(shape);
    service.changeShapeStrokeWidth('widthtest', 10);
    expect(service.getShapeById('widthtest')!.strokeWidth).toBe(10);
  });

  it('should change corner radius for rectangle', () => {
    const shape: RectangleShape = { ...createBaseRect(), id: 'corner' };
    service.addShape(shape);
    service.changeShapeCornerRadius('corner', 15);
    expect((service.getShapeById('corner') as RectangleShape).cornerRadius).toBe(15);
  });

  it('should change star points', () => {
    const shape: StarShape = {
      id: 'star1',
      type: 'star',
      x: 0, y: 0,
      outerRadius: 50,
      innerRadius: 25,
      points: 5,
      fill: 'yellow',
      stroke: 'black',
      strokeWidth: 1,
      strokeOpacity: 1
    };

    service.addShape(shape);
    service.changeStarPoints('star1', 8);
    expect((service.getShapeById('star1') as StarShape).points).toBe(8);
  });

  it('should change shape stroke opacity', () => {
    const shape: RectangleShape = { ...createBaseRect(), id: 'opacity-test'}
    service.addShape(shape);
    service.changeShapeOpacity('opacity-test', 0.5);

    const updated = service.getShapeById('opacity-test');
    expect(updated!.strokeOpacity).toBe(0.5);
  });

  it('should generate correct star points string', () => {
    const shape: StarShape = {
      id: 's',
      type: 'star',
      x: 0, y: 0,
      points: 5,
      outerRadius: 50,
      innerRadius: 25,
      fill: '', stroke: '', strokeWidth: 0, strokeOpacity: 1
    };
    const points = service.generateStarPoints(shape);
    const parts = points.split(' ');
    expect(parts.length).toBe(10);
  });


  function createBaseRect(): RectangleShape {
    return {
      id: '',
      type: 'rectangle',
      x: 0, y: 0,
      width: 10, height: 10,
      cornerRadius: 0,
      fill: '', stroke: '', strokeWidth: 1, strokeOpacity: 1
    };
  }
});
