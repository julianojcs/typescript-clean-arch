import { Route } from "../../../domain/route.entity";
import { DataSource, Repository } from "typeorm";
import { RouteRepositoryInterface } from "../../../domain/route.repository";
import { join } from 'path';
import { RouteSchema } from "./route.schema";

export const dataSource = new DataSource({
  type: 'sqlite',
  database: join(__dirname, 'database.sqlite'),
  synchronize: true,
  logging: true,
  entities: [RouteSchema],
})

export class RouteTypeOrmRepository implements RouteRepositoryInterface {
  constructor(private ormRepo: Repository<Route>) {

  }

  async insert(route: Route): Promise<void> {
    await this.ormRepo.save(route);
  }

  findAll(): Promise<Route[]> {
    return this.ormRepo.find();
  }
}