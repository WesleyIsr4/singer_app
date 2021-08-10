import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import IProjectRepository from '../repositories/IProjectRepository';

@injectable()
class DeleteProjectService {
  constructor(
    @inject('ProjectRepositories')
    private projectRepositories: IProjectRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const projects = await this.projectRepositories.findById(id);

    if (!projects) {
      throw new AppError('Project does not exists', 401);
    }

    await this.projectRepositories.delete(id);
  }
}

export default DeleteProjectService;
