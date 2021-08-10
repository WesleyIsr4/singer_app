import IProjectRepository from '@modules/Project/repositories/IProjectRepository';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import ICreateTaskDTO from '../dtos/ICreateTaskDTO';
import Task from '../infra/typeorm/entities/task';
import ITaskRepository from '../repositories/ITaskRepositories';
import { isBefore } from 'date-fns';
import TasksStatus from '../enum/statusTask';

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

    // const dateFormatted = new Date(date);

    // if (isBefore(dateFormatted, Date.now())) {
    //   throw new AppError('cannot create a task with a past date');
    // }

    const createTask = await this.taskRepositories.create({
      name,
      date,
      status: TasksStatus.NEW,
      user_id,
      project_id,
    });

    return createTask;
  }
}

export default CreateTaskService;
