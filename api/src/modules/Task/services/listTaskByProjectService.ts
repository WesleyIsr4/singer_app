import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { inject, injectable } from 'tsyringe';
import Task from '../infra/typeorm/entities/task';
import ITaskRepository from '../repositories/ITasksRepository';

@injectable()
class ListTaskByProjectService {
  constructor(
    @inject('TaskRepositories')
    private taskRepositories: ITaskRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(project_id: string): Promise<Task[]> {
    let tasks = await this.cacheProvider.recover<Task[]>(
      `project-task:${project_id}`,
    );

    if (!tasks) {
      tasks = await this.taskRepositories.findByProject(project_id);
    }

    await this.cacheProvider.save(`project-task:${project_id}`, tasks);

    return tasks;
  }
}

export default ListTaskByProjectService;
