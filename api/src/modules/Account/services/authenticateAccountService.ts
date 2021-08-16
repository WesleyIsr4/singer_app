import AppError from '@shared/error/AppError';
import { compare } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import authConfig from '@config/auth';
import Account from '../infra/typeorm/entities/account';
import IAccountRepositories from '../repositories/IAccountsRepository';
import { sign } from 'jsonwebtoken';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: Account;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('AccountRepositories')
    private accountsRepositories: IAccountRepositories,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.accountsRepositories.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password incorrect');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Email or password incorrect');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
