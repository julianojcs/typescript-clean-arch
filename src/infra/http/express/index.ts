import express, {Express, Request, Response} from 'express';
import { CreateRouteUseCase } from '../../../application/create-route.use-case';
import { CreateUserUseCase } from '../../../application/user/create-user.use-case';
import { ListAllRoutesUseCase } from '../../../application/list-all-routes.use-case';
import { ListAllUsersUseCase } from '../../../application/user/list-all-user.use-case';
import { RouteTypeOrmRepository } from '../../db/typeorm/route-typeorm.repository';
import { UserTypeOrmRepository } from '../../db/typeorm/user/user-typeorm.repository';
import cors from 'cors';
import { dataSource } from '../../db/typeorm/dataSource';
import { Route } from '../../../domain/route.entity';
import { User } from '../../../domain/user/user.entity';

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

const port = process.env.PORT || 3000;
const routeOrmRepo = dataSource.getRepository(Route)
const routeRepo = new RouteTypeOrmRepository(routeOrmRepo);
const userOrmRepo = dataSource.getRepository(User)
const userRepo = new UserTypeOrmRepository(userOrmRepo);

app.get('/routes', async (_: Request, res: Response) => {
  const listAllRoutesUseCase = new ListAllRoutesUseCase(routeRepo);
  const routeList = await listAllRoutesUseCase.execute();
  res.status(200).json(routeList);
})
app.post('/route', async (req: Request, res: Response) => {
  const createRouteUseCase = new CreateRouteUseCase(routeRepo);
  const response = await createRouteUseCase.execute(req.body);
  res.status(201).json(response);
});

app.get('/users', async (_: Request, res: Response) => {
  const listAllUsersUseCase = new ListAllUsersUseCase(userRepo);
  const routeList = await listAllUsersUseCase.execute();
  res.status(200).json(routeList);
})
app.post('/user', async (req: Request, res: Response) => {
  const createUserUseCase = new CreateUserUseCase(userRepo);
  const response = await createUserUseCase.execute(req.body);
  res.status(201).json(response);
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});