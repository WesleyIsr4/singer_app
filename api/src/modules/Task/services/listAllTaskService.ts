import { inject, injectable } from 'tsyringe';
import Task from '../infra/typeorm/entities/task';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ITaskRepository from '../repositories/ITasksRepository';

@injectable()
class ListAllTaskService {
  constructor(
    @inject('TaskRepositories')
    private taskRepositories: ITaskRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(user_id: string): Promise<Task[]> {
    let tasks = await this.cacheProvider.recover<Task[]>(
      `user-tasks:${user_id}`,
    );

    if (!tasks) {
      tasks = await this.taskRepositories.findAll(user_id);
    }

    await this.cacheProvider.save(`user-tasks:${user_id}`, tasks);

    return tasks;
  }
}
export default ListAllTaskService;
