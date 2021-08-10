import uploadConfig from '@config/upload';
import { Router } from 'express';
import multer from 'multer';
import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated';
import accountController from '../controller/accountController';
import UserAvatarController from '../controller/userAvatarController';

const accountRouter = Router();
const upload = multer(uploadConfig);

const createAccount = new accountController();
const avatarController = new UserAvatarController();

accountRouter.post('/', createAccount.create);
accountRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  avatarController.update,
);

export default accountRouter;
