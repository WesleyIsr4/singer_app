import ICreateTaskDTO from '../dtos/ICreateTaskDTO';
import Task from '../infra/typeorm/entities/task';

export default interface ITaskRepository {
  create(data: ICreateTaskDTO): Promise<Task>;
  findById(id: string): Promise<Task | undefined>;
  findAll(user_id: string): Promise<Task[]>;
  findByProject(project_id: string): Promise<Task[]>;
  delete(id: string): Promise<void>;
  save(task: Task): Promise<Task>;
}
