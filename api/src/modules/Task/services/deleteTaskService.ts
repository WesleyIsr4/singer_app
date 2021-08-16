import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import ITaskRepository from '../repositories/ITasksRepository';

@injectable()
class DeleteTaskService {
  constructor(
    @inject('TaskRepositories')
    private taskRepositories: ITaskRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const task = await this.taskRepositories.findById(id);

    if (!task) {
      throw new AppError('Project does not exists', 401);
    }

    await this.taskRepositories.delete(id);
  }
}

export default DeleteTaskService;
