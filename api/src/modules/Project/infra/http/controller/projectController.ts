import CreateProjectService from '@modules/Project/services/createProjectService';
import DeleteProjectService from '@modules/Project/services/deleteProjectService';
import ListAllProjectService from '@modules/Project/services/listAllProjectService';
import UpdateProjectService from '@modules/Project/services/updateProjectService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProjectController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, type } = request.body;
    const user_id = request.user.id;

    const createProject = container.resolve(CreateProjectService);

    const project = await createProject.execute({
      name,
      type,
      user_id,
    });

    return response.json(project);
  }

  async list(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listProject = container.resolve(ListAllProjectService);

    const project = await listProject.execute(user_id);

    return response.json(classToClass(project));
  }

  async destroy(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProject = container.resolve(DeleteProjectService);

    const project = await deleteProject.execute(id);

    return response.json(project);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, type } = request.body;

    const updateProject = container.resolve(UpdateProjectService);

    const project = await updateProject.execute({
      id,
      name,
      type,
    });

    return response.json(project);
  }
}
