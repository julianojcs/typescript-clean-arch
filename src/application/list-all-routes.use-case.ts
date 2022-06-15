import { RouteProps } from "../domain/route.entity"
import { RouteRepositoryInterface } from "../domain/route.repository";

export class ListAllRoutesUseCase {
  constructor(private routeRepo: RouteRepositoryInterface) {}

  async execute(): Promise<RouteProps[]> {
    const routes = await this.routeRepo.findAll();
    return routes.map((route) => route.toJSON());
  }
}