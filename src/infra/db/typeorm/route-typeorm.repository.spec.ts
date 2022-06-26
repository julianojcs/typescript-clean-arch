import { dataSourceInMemory as dataSource } from './dataSource';
import { Route, RouteProps } from '../../../domain/route.entity';
import { RouteTypeOrmRepository } from './route-typeorm.repository';

const routeProps: RouteProps = {
  title: 'Minha rota',
  startPosition: { lat: -23.5489, lng: -46.6388 },
  endPosition: { lat: -23.55, lng: -46.64 },
};
const route = Route.create(routeProps);

beforeEach(async () => {
  await dataSource.initialize();
});
afterEach(async () => {
  await dataSource.destroy();
});

describe('RouteTypeOrmRepository Tests', () => {
  it('should insert a new route', async () => {
    // await dataSource.initialize();
    const ormRepo = dataSource.getRepository(Route)
    const repository = new RouteTypeOrmRepository(ormRepo);
    await repository.insert(route);

    const routeFound = await ormRepo.findOneBy({ id: route.id });
    
    expect(routeFound?.toJSON()).toStrictEqual(route.toJSON());
    expect(routeFound).toStrictEqual(route);
  });

  it('should find all routes', async () => {
    const ormRepo = dataSource.getRepository(Route)
    const routes: Route[] = [];
    const repository = new RouteTypeOrmRepository(ormRepo);

    for (let i = 0; i < 3; i++) {
      const route = Route.create({ ...routeProps, title: `Minha rota #${i + 1}` });
      await repository.insert(route);
      routes.push(route);
    }
    const routeList = await repository.findAll();
    
    expect(routeList).toHaveLength(3);
    expect(routeList).toHaveLength(routes.length);
    expect(routeList).toHaveLength(routeList.length);
    expect(routeList[0]).toStrictEqual(routes[0]);
    expect(routeList[1]).toStrictEqual(routeList[1]);
    expect(routeList[2].title).toBe('Minha rota #3');
  });
});
