import accountRouter from '@modules/Account/infra/http/routes/account.routes';
import authenticateRoutes from '@modules/Account/infra/http/routes/session.routes';
import projectRoutes from '@modules/Project/infra/http/routes/project.routes';
import taskRoutes from '@modules/Task/infra/http/routes/task.routes';
import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello world' });
});

routes.use('/account', accountRouter);
routes.use('/session', authenticateRoutes);
routes.use('/project', projectRoutes);
routes.use('/task', taskRoutes);

export default routes;
