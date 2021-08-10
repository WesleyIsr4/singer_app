import CreateAccountService from '@modules/Account/services/createAccountService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class accountController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createAccount = container.resolve(CreateAccountService);

    const account = await createAccount.execute({
      name,
      email,
      password,
    });

    return response.json(classToClass(account));
  }
}
