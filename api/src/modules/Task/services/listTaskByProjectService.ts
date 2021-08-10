import { inject, injectable } from 'tsyringe';
import Task from '../infra/typeorm/entities/task';
import ITaskRepository from '../repositories/ITaskRepositories';

@injectable()
class ListTaskByProjectService {
  constructor(
    @inject('TaskRepositories')
    private taskRepositories: ITaskRepository,
  ) {}

  async execute(project_id: string): Promise<Task[]> {
    const tasks = await this.taskRepositories.findByProject(project_id);

    return tasks;
  }
}

export default ListTaskByProjectService;
