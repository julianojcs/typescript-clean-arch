import { EntitySchema } from 'typeorm'
import { Route } from '../../../domain/route.entity'

export const RouteSchema = new EntitySchema<Route>({
  name: 'route',
  target: Route,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid'
    },
    title: {
      type: String,
      length: 255,
      nullable: false,
    },
    startPosition: {
      type: 'simple-json',
      nullable: false,
    },
    endPosition: {
      type: 'simple-json',
      nullable: false,
    },
    points: {
      type: 'simple-json',
      nullable: false,
    }
  }
})