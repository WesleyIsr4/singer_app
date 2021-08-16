import ICreateProjectDTO from '@modules/Project/dtos/ICreateProjectDTO';
import IProjectRepository from '@modules/Project/repositories/IProjectRepository';
import { getRepository, Repository } from 'typeorm';
import Project from '../entities/project';

class ProjectRepositories implements IProjectRepository {
  private ormRepository: Repository<Project>;

  constructor() {
    this.ormRepository = getRepository(Project);
  }

  async create({ name, type, user_id }: ICreateProjectDTO): Promise<Project> {
    const project = this.ormRepository.create({ name, type, user_id });

    await this.ormRepository.save(project);

    return project;
  }
  async listAll(user_id: string): Promise<Project[]> {
    const projects = await this.ormRepository.find({
      relations: ['tasks'],
      where: { user_id },
    });

    return projects;
  }
  async listByName(name: string): Promise<Project | undefined> {
    const project = await this.ormRepository.findOne({
      where: { name },
    });

    return project;
  }
  async findById(id: string): Promise<Project | undefined> {
    const project = await this.ormRepository.findOne(id);

    return project;
  }
  async delete(id: string): Promise<void> {
    await this.ormRepository.delete({
      id,
    });
  }
  async save(project: Project): Promise<Project> {
    return this.ormRepository.save(project);
  }
}

export default ProjectRepositories;
