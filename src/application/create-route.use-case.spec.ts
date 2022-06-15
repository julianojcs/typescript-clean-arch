import { RouteInMemoryRepository } from "../infra/db/route-in-memory.repository";
import { CreateRouteUseCase } from "./create-route.use-case";

const routeProps = {
  title: 'Minha primeira rota', 
  startPosition: { lat: -23.5489, lng: -46.6388 },
  endPosition: { lat: -23.55, lng: -46.64 },
  points: []
}
const repository = new RouteInMemoryRepository();

describe('CreateRouteUseCase Tests', () => {
  it('should create a new route', async () => {
    const createRouteUseCase = new CreateRouteUseCase(repository);  
    const result = await createRouteUseCase.execute(routeProps);
    
    expect(repository.items).toHaveLength(1);
    expect(result).toStrictEqual({
      id: repository.items[0].id,
      ...routeProps
    });
  });
})