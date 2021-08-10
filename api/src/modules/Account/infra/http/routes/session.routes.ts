import { Router } from 'express';
import AuthenticateUserController from '../controller/authenticateUserController';

const authenticateRoutes = Router();
const authenticateController = new AuthenticateUserController();

authenticateRoutes.post('/', authenticateController.handle);

export default authenticateRoutes;
