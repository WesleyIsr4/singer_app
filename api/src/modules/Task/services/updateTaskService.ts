import AppError from '@shared/error/AppError';
import { isBefore } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import Task from '../infra/typeorm/entities/task';
import ITaskRepository from '../repositories/ITasksRepository';

interface IRequest {
  id: string;
  name: string;
  date: string;
}

@injectable()
class UpdateTaskService {
  constructor(
    @inject('TaskRepositories')
    private taskRepositories: ITaskRepository,
  ) {}

  async execute({ id, name, date }: IRequest): Promise<Task> {
    if (!name) {
      throw new AppError('Name invalid', 401);
    }

    if (!date) {
      throw new AppError('Date invalid', 401);
    }

    const dateFormatted = new Date(date);

    if (isBefore(dateFormatted, Date.now())) {
      throw new AppError('cannot create a task with a past date');
    }

    const task = await this.taskRepositories.findById(id);

    if (!task) {
      throw new AppError('Task does not exists');
    }

    task.name = name;
    task.date = date;

    await this.taskRepositories.save(task);

    return task;
  }
}

export default UpdateTaskService;
