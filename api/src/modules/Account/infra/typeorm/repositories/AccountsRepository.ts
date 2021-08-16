import ICreateAccountDTO from '@modules/Account/dtos/ICreateAccountDTO';
import IAccountRepositories from '@modules/Account/repositories/IAccountRepository';
import { Repository, getRepository } from 'typeorm';
import Account from '../entities/account';

class AccountRepositories implements IAccountRepositories {
  private ormRepository: Repository<Account>;

  constructor() {
    this.ormRepository = getRepository(Account);
  }

  async create({ name, email, password }: ICreateAccountDTO): Promise<Account> {
    const account = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(account);

    return account;
  }
  async findById(id: string): Promise<Account | undefined> {
    const account = await this.ormRepository.findOne({ id });

    return account;
  }
  async findByEmail(email: string): Promise<Account | undefined> {
    const account = await this.ormRepository.findOne({
      email,
    });

    return account;
  }
  async save(account: Account): Promise<Account> {
    return this.ormRepository.save(account);
  }
}

export default AccountRepositories;
