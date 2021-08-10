import IAccountRepositories from '@modules/Account/repositories/IAccountRepositories';
import AppError from '@shared/error/AppError';
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
  ) {}

  async execute(user_id: string): Promise<Project[]> {
    const checkUserExists = await this.accountRepositories.findById(user_id);

    if (!checkUserExists) {
      throw new AppError('User does not exists');
    }

    const projects = await this.projectRepositories.listAll(user_id);

    return projects;
  }
}

export default ListAllProjectService;
