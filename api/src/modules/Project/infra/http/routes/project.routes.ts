import { ensureAuthenticated } from '@modules/Account/infra/middlewares/ensureAuthenticated';
import { Router } from 'express';
import ProjectController from '../controller/projectController';

const projectRoutes = Router();
projectRoutes.use(ensureAuthenticated);

const projectController = new ProjectController();

projectRoutes.post('/', projectController.create);
projectRoutes.get('/', projectController.list);
projectRoutes.delete('/:id', projectController.destroy);
projectRoutes.put('/:id', projectController.update);

export default projectRoutes;
