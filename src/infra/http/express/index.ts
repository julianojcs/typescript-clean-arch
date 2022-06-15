import express, {Express, Request, Response} from 'express';
import { CreateRouteUseCase } from '../../../application/create-route.use-case';
import { ListAllRoutesUseCase } from '../../../application/list-all-routes.use-case';
import { RouteInMemoryRepository } from '../../db/route-in-memory.repository';

const app: Express = express();
app.use(express.json());
const port = process.env.PORT || 3000;
const routeRepo = new RouteInMemoryRepository();

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