import { classToClass } from 'class-transformer';

import { container } from 'tsyringe';
import { Request, Response } from 'express';
import AuthenticateUserService from '@modules/Account/services/authenticateAccountService';

class AuthenticateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const authenticateInfo = await authenticateUser.execute({
      email,
      password,
    });

    return response.json(classToClass(authenticateInfo));
  }
}

export default AuthenticateUserController;
