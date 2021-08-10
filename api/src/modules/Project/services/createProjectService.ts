import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import ICreateProjectDTO from '../dtos/ICreateProjectDTO';
import Project from '../infra/typeorm/entities/project';
import IProjectRepository from '../repositories/IProjectRepository';

@injectable()
class CreateProjectService {
  constructor(
    @inject('ProjectRepositories')
    private projectRepositories: IProjectRepository,
  ) {}

  async execute({ name, type, user_id }: ICreateProjectDTO): Promise<Project> {
    if (!name) {
      throw new AppError('Name invalid', 401);
    }

    if (!type) {
      throw new AppError('Type invalid', 401);
    }

    const checkNameExists = await this.projectRepositories.listByName(name);

    if (checkNameExists) {
      throw new AppError('Name alredy exists', 401);
    }

    const createProject = await this.projectRepositories.create({
      name,
      type,
      user_id,
    });

    return createProject;
  }
}

export default CreateProjectService;
