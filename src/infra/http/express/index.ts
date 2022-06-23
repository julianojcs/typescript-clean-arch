import express, {Express, Request, Response} from 'express';
import { CreateRouteUseCase } from '../../../application/create-route.use-case';
import { ListAllRoutesUseCase } from '../../../application/list-all-routes.use-case';
import { RouteTypeOrmRepository } from '../../db/typeorm/route-typeorm.repository';
import cors from 'cors';
import { dataSource } from '../../db/typeorm/route-typeorm.repository';
import { Route } from '../../../domain/route.entity';

const app: Express = express();
app.use(express.json());
app.use(cors())

// establish database connection
const connect = async () => {
  try {
    await dataSource.initialize()
    console.log("Data Source has been initialized!")
  } catch (error) {
    console.error("Error during Data Source initialization: ", error)
  }
}
connect()
// dataSource
//   .initialize()
//   .then(() => {
//       console.log("Data Source has been initialized!")
//   })
//   .catch((err) => {
//       console.error("Error during Data Source initialization:", err)
//   })

const port = process.env.PORT || 3000;
const ormRepo = dataSource.getRepository(Route)
const routeRepo = new RouteTypeOrmRepository(ormRepo);

app.get('/routes', async (_: Request, res: Response) => {
  const listAllUseCase = new ListAllRoutesUseCase(routeRepo);
  const routeList = await listAllUseCase.execute();
  res.status(200).json(routeList);
})
app.post('/routes', async (req: Request, res: Response) => {
  const createUseCase = new CreateRouteUseCase(routeRepo);
  const response = await createUseCase.execute(req.body);
  res.status(201).json(response);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});