import CreateTaskService from '@modules/Task/services/createTaskService';
import DeleteTaskService from '@modules/Task/services/deleteTaskService';
import ListAllTaskService from '@modules/Task/services/listAllTaskService';
import ListTaskByProjectService from '@modules/Task/services/listTaskByProjectService';
import UpdateTaskService from '@modules/Task/services/updateTaskService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class TaskController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, date } = request.body;
    const project_id = request.params.id;
    const user_id = request.user.id;

    const createTask = container.resolve(CreateTaskService);

    const task = await createTask.execute({
      name,
      date,
      user_id,
      project_id,
    });

    return response.json(task);
  }

  async list(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listTask = container.resolve(ListAllTaskService);

    const list = await listTask.execute(user_id);

    return response.json(list);
  }

  async ListByProject(request: Request, response: Response): Promise<Response> {
    const project_id = request.params.id;

    const listTask = container.resolve(ListTaskByProjectService);

    const list = await listTask.execute(project_id);

    return response.json(list);
  }

  async destroy(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;

    const deletetask = container.resolve(DeleteTaskService);

    const task = deletetask.execute(id);

    return response.json(task);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { name, date } = request.body;
    const id = request.params.id;

    const updateTask = container.resolve(UpdateTaskService);

    const task = await updateTask.execute({
      id,
      name,
      date,
    });

    return response.json(task);
  }
}
