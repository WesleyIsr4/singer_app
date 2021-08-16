import AppError from '@shared/error/AppError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import ICreateAccountDTO from '../dtos/ICreateAccountDTO';
import Account from '../infra/typeorm/entities/account';
import IAccountRepositories from '../repositories/IAccountsRepository';

@injectable()
class CreateAccountService {
  constructor(
    @inject('AccountRepositories')
    private accountRepositories: IAccountRepositories,
  ) {}

  async execute({
    name,
    email,
    password,
  }: ICreateAccountDTO): Promise<Account> {
    if (!email) {
      throw new AppError('E-mail invalid', 401);
    }

    const checkEmailExists = await this.accountRepositories.findByEmail(email);

    if (checkEmailExists) {
      throw new AppError('E-mail already exists', 401);
    }

    if (password.length > 8) {
      throw new AppError('Your password must have at least 8 characters', 401);
    }

    const passwordHash = await hash(password, 8);

    const account = await this.accountRepositories.create({
      name,
      email,
      password: passwordHash,
    });

    return account;
  }
}
export default CreateAccountService;
