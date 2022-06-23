import { RouteInMemoryRepository } from "../infra/db/in-memory/route-in-memory.repository";
import { CreateRouteOutput, CreateRouteUseCase } from "./create-route.use-case";
import { ListAllRoutesUseCase } from "./list-all-routes.use-case";
import { Route } from "../domain/route.entity";

const routeProps = {
  title: 'Minha rota', 
  startPosition: { lat: -23.5489, lng: -46.6388 },
  endPosition: { lat: -23.55, lng: -46.64 },
  points: []
}
const repository = new RouteInMemoryRepository();
const createRouteUseCase = new CreateRouteUseCase(repository);  

describe('ListAllRoutesUseCase Tests', () => {
  it('should list all routes', async () => {
    const routes: CreateRouteOutput[] = [];
    for (let i=0; i<3; i++) {
      const result = await createRouteUseCase.execute({...routeProps, title: `Minha rota #${i+1}`});
      routes.push(result);
    }
    const listAllRoutesUseCase = new ListAllRoutesUseCase(repository)
    const routesList = listAllRoutesUseCase.execute()
    routesList.then(list => expect(list).toHaveLength(3));
    routesList.then(list => expect(list).toHaveLength(routes.length));
    routesList.then(list => list.forEach((route, index) => {
      expect(route.title).toBe(`Minha rota #${index+1}`);
    }));
    routesList.then(list => list.forEach((route, index) => {
      expect(route).toStrictEqual(routes[index]);
    }));
  });
})