import { ensureAuthenticated } from '@modules/Account/infra/middlewares/ensureAuthenticated';
import { Router } from 'express';
import TaskController from '../controller/taskController';

const taskRoutes = Router();
taskRoutes.use(ensureAuthenticated);

const taskController = new TaskController();

taskRoutes.post('/:id', taskController.create);
taskRoutes.put('/:id', taskController.update);
taskRoutes.delete('/:id', taskController.destroy);
taskRoutes.get('/:id', taskController.ListByProject);
taskRoutes.get('/', taskController.list);

export default taskRoutes;
