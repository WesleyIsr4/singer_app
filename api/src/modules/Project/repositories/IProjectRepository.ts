import ICreateProjectDTO from '../dtos/ICreateProjectDTO';
import Project from '../infra/typeorm/entities/project';

export default interface IProjectRepository {
  create(data: ICreateProjectDTO): Promise<Project>;
  listAll(user_id: string): Promise<Project[]>;
  listByName(name: string): Promise<Project | undefined>;
  findById(id: string): Promise<Project | undefined>;
  delete(id: string): Promise<void>;
  save(project: Project): Promise<Project>;
}
