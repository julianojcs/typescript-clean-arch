import { LatLng, Route } from "./route.entity";
import crypto from 'crypto';

let routeProps = {
  id: crypto.randomUUID(),
  title: 'Minha primeira rota', 
  startPosition: { lat: -23.5489, lng: -46.6388 },
  endPosition: { lat: -23.55, lng: -46.64 }
}
let route = Route.create(routeProps);

describe('Create Route Tests', () => {
  test('constructor', () => {
    route = Route.create(routeProps);
    expect(route.id).toBeDefined();
    expect(route.title).toBe('Minha primeira rota');
    expect(route.startPosition).toStrictEqual({ lat: -23.5489, lng: -46.6388 });
    expect(route.endPosition).toStrictEqual({ lat: -23.55, lng: -46.64 });
    expect(route.points).toStrictEqual([]);
  })

  test('constructor with empty points', () => {
    route = Route.create({
      ...routeProps
    });
    expect(route.props).toStrictEqual({
      ...routeProps, points: []
    });
  })
  
  test('constructor with points', () => {
    route = Route.create({
      ...routeProps,
      points: [ 
        { lat: -23.64, lng: -46.53},
        { lat: -23.67, lng: -46.73} 
      ]
    });
    expect(route.props).toStrictEqual({
      ...routeProps,
      points: [ 
        { lat: -23.64, lng: -46.53},
        { lat: -23.67, lng: -46.73} 
      ]
    });
  })
})

describe('Update Route Tests', () => {
  test('updateTitle method', () => {
    route.updateTitle('Minha rota atualizada');
    expect(route.title).toBe('Minha rota atualizada');
  })
  test('updatePosition method', () => {
    const startPosition: LatLng = { lat: -23.5489, lng: -46.6388 };
    const endPosition: LatLng = { lat: -23.55, lng: -46.64 };
    route.updatePosition(startPosition, endPosition);
    expect(route.startPosition).toBe(startPosition);
    expect(route.endPosition).toBe(endPosition);
  })
  test('updatePoints method', () => {
    const points: Array<LatLng> = [
      { lat: -23.11, lng: -46.33},
      { lat: -23.22, lng: -46.44}, 
      { lat: -23.55, lng: -46.66} 
    ]
    route.updatePoints(points);
    expect(route.points).toHaveLength(3);
    expect(route.points).toStrictEqual(points);
  })
});

describe('Route toJSON Tests', () => {
  let route = Route.create({...routeProps});
  test('toJSON method', () => {
    expect(route.toJSON()).toStrictEqual({
      ...routeProps, points: []
    });
  });
});