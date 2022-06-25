import { dataSourceInMemory as dataSource } from './dataSource';
import { Route } from '../../../domain/route.entity'

beforeEach(async () => {
  await dataSource.initialize();
});
afterEach(async () => {
  await dataSource.destroy();
});

describe('RouteSchema Tests', () => {
  test('should create a new route', async () => {
    const route = Route.create({
      title: 'Minha primeira rota',
      startPosition: { lat: -23.5489, lng: -46.6388 },
      endPosition: { lat: -23.55, lng: -46.64 },
      points: [
        { lat: -23.5489, lng: -46.6388 }
      ],
    })
    const routeRepo = dataSource.getRepository(Route)
    await routeRepo.save(route)
    console.log(await routeRepo.findBy( {title: 'Minha primeira rota'} ))
    expect(route.id).toBeDefined();
    expect(route.title).toBe('Minha primeira rota');
    expect(route.startPosition).toStrictEqual({ lat: -23.5489, lng: -46.6388 });
    expect(route.endPosition).toStrictEqual({ lat: -23.55, lng: -46.64 });
    expect(route.points).toStrictEqual([
      { lat: -23.5489, lng: -46.6388 }
    ]);
    expect(await routeRepo.findOneBy({ id: route.id })).toStrictEqual(route);
  })
});