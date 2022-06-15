import { RouteInMemoryRepository } from "./route-in-memory.repository";
import { Route } from "../../domain/route.entity";

let routeProps = {
  title: 'Minha rota', 
  startPosition: { lat: -23.5489, lng: -46.6388 },
  endPosition: { lat: -23.55, lng: -46.64 }
}
let route = new Route(routeProps);

describe('RouteInMemory Repository Tests', () => {
  it('should insert a new route', async () => {
    const repository = new RouteInMemoryRepository();
    await repository.insert(route);
    expect(repository.items).toHaveLength(1);
    expect(repository.items[0]).toStrictEqual(route);
  })
  it('should find all routes', async () => {
    const routes: Route[] = [];
    const repository = new RouteInMemoryRepository();
    for (let i=0; i<3; i++) {
      let route = new Route({...routeProps, title: `Minha rota #${i+1}`});
      await repository.insert(route);
      routes.push(route);
    }
    const routeList = await repository.findAll();
    expect(repository.items).toHaveLength(3);
    expect(repository.items).toHaveLength(routes.length);
    expect(repository.items).toHaveLength(routeList.length);
    expect(repository.items[0]).toStrictEqual(routes[0]);
    expect(repository.items[1]).toStrictEqual(routeList[1]);
    expect(repository.items[2].title).toBe('Minha rota #3');
  })
})