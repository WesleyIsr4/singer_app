import AppError from '@shared/error/AppError';
import IStorageProvider from '@shared/container/providers/storageProvider/models/IStorageProvider';
import { inject, injectable } from 'tsyringe';
import Account from '../infra/typeorm/entities/account';
import IAccountRepositories from '../repositories/IAccountsRepository';

interface IRequest {
  user_id: string;
  photo_filename: string;
}

@injectable()
class UpdateUserPhotoService {
  constructor(
    @inject('AccountRepositories')
    private accountsRepositories: IAccountRepositories,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    user_id,
    photo_filename,
  }: IRequest): Promise<Account> {
    const user = await this.accountsRepositories.findById(user_id);

    if (!user) {
      throw new AppError('Only logged in users can change the photo', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(photo_filename);

    user.avatar = filename;

    await this.accountsRepositories.save(user);

    return user;
  }
}

export default UpdateUserPhotoService;
