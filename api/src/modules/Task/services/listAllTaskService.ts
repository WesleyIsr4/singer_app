import { inject, injectable } from 'tsyringe';
import Task from '../infra/typeorm/entities/task';
import ITaskRepository from '../repositories/ITaskRepositories';

@injectable()
class ListAllTaskService {
  constructor(
    @inject('TaskRepositories')
    private taskRepositories: ITaskRepository,
  ) {}

  async execute(user_id: string): Promise<Task[]> {
    const tasks = await this.taskRepositories.findAll(user_id);

    return tasks;
  }
}

export default ListAllTaskService;
