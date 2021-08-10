import ICreateAccountDTO from '../dtos/ICreateAccountDTO';
import Account from '../infra/typeorm/entities/account';

export default interface IAccountRepositories {
  create(data: ICreateAccountDTO): Promise<Account>;
  findById(id: string): Promise<Account | undefined>;
  findByEmail(email: string): Promise<Account | undefined>;
  save(account: Account): Promise<Account>;
}
