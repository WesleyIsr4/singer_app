import ICreateTaskDTO from '@modules/Task/dtos/ICreateTaskDTO';
import ITaskRepository from '@modules/Task/repositories/ITaskRepositories';
import { Repository, getRepository } from 'typeorm';
import Task from '../entities/task';

class TaskRepositories implements ITaskRepository {
  private ormRepository: Repository<Task>;

  constructor() {
    this.ormRepository = getRepository(Task);
  }
  async findByProject(project_id: string): Promise<Task[]> {
    const task = await this.ormRepository.find({
      relations: ['project'],
      where: { project_id },
    });

    return task;
  }
  async findAll(user_id: string): Promise<Task[]> {
    const task = await this.ormRepository.find({
      relations: ['project'],
      where: { user_id },
    });

    return task;
  }

  async create({
    name,
    date,
    status,
    user_id,
    project_id,
  }: ICreateTaskDTO): Promise<Task> {
    const task = this.ormRepository.create({
      name,
      date,
      status,
      user_id,
      project_id,
    });

    await this.ormRepository.save(task);

    return task;
  }
  async findById(id: string): Promise<Task | undefined> {
    const task = await this.ormRepository.findOne({ id });

    return task;
  }
  async delete(id: string): Promise<void> {
    await this.ormRepository.delete({ id });
  }
  async save(task: Task): Promise<Task> {
    return this.ormRepository.save(task);
  }
}

export default TaskRepositories;
