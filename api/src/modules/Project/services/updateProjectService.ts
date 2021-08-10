import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import IUpdateProjectDTO from '../dtos/IUpdateProjectDTO';
import Project from '../infra/typeorm/entities/project';
import IProjectRepository from '../repositories/IProjectRepository';

@injectable()
class UpdateProjectService {
  constructor(
    @inject('ProjectRepositories')
    private projectRepositories: IProjectRepository,
  ) {}

  async execute({ id, name, type }: IUpdateProjectDTO): Promise<Project> {
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

    const project = await this.projectRepositories.findById(id);

    if (!project) {
      throw new AppError('Project does not exists', 401);
    }

    project.name = name;
    project.type = type;

    await this.projectRepositories.save(project);

    return project;
  }
}

export default UpdateProjectService;
