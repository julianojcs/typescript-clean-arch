import { Route } from "./route.entity";

// Inversão de Dependência
export interface RouteRepositoryInterface {
  insert(route: Route): Promise<void>;
  findAll(): Promise<Route[]>;
}