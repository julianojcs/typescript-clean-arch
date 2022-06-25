import { DataSource } from "typeorm";
import { RouteSchema } from "./route.schema";
import { UserSchema } from "./user/user.schema";

export const dataSource = new DataSource({
  type: 'sqlite',
  database: './src/database.sqlite',
  synchronize: true,
  logging: true,
  entities: [RouteSchema, UserSchema],
})

export const dataSourceInMemory = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  logging: false,
  entities: [RouteSchema, UserSchema],
})