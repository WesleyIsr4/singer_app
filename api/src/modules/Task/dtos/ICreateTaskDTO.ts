import TasksStatus from '../enum/statusTask';

export default interface ICreateTaskDTO {
  name: string;
  date: string;
  status: TasksStatus;
  user_id: string;
  project_id: string;
}
