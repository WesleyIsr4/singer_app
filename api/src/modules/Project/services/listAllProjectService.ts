import IAccountRepositories from '@modules/Account/repositories/IAccountsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/error/AppError';
import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import Project from '../infra/typeorm/entities/project';
import IProjectRepository from '../repositories/IProjectRepository';

@injectable()
class ListAllProjectService {
  constructor(
    @inject('ProjectRepositories')
    private projectRepositories: IProjectRepository,

    @inject('AccountRepositories')
    private accountRepositories: IAccountRepositories,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(user_id: string): Promise<Project[]> {
    let projects = await this.cacheProvider.recover<Project[]>(
      `user-project:${user_id}`,
    );

    const checkUserExists = await this.accountRepositories.findById(user_id);

    if (!checkUserExists) {
      throw new AppError('User does not exists');
    }

    projects = await this.projectRepositories.listAll(user_id);

    await this.cacheProvider.save(
      `user-project:${user_id}`,
      classToClass(projects),
    );

    return projects;
  }
}

export default ListAllProjectService;
