import IProjectRepository from '@modules/Project/repositories/IProjectRepository';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import Task from '../infra/typeorm/entities/task';
import ITaskRepository from '../repositories/ITasksRepository';
import { isBefore } from 'date-fns';
import TasksStatus from '../enum/statusTask';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  name: string;
  date: string;
  user_id: string;
  project_id: string;
}

@injectable()
class CreateTaskService {
  constructor(
    @inject('TaskRepositories')
    private taskRepositories: ITaskRepository,

    @inject('ProjectRepositories')
    private projectRepositories: IProjectRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute({ name, date, user_id, project_id }: IRequest): Promise<Task> {
    if (!name) {
      throw new AppError('Name invalid', 401);
    }

    if (!date) {
      throw new AppError('Date invalid', 401);
    }

    const checkProjectExists = await this.projectRepositories.findById(
      project_id,
    );

    if (!checkProjectExists) {
      throw new AppError('Project does not exists', 400);
    }

    const dateFormatted = new Date(date);

    if (isBefore(dateFormatted, Date.now())) {
      throw new AppError('cannot create a task with a past date');
    }

    const createTask = await this.taskRepositories.create({
      name,
      date,
      status: TasksStatus.NEW,
      user_id,
      project_id,
    });

    await this.cacheProvider.invalidatePrefix('project-task');
    await this.cacheProvider.invalidatePrefix('user-tasks');

    return createTask;
  }
}

export default CreateTaskService;
