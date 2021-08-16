import { container } from 'tsyringe';

import './providers/index';

import AccountRepositories from '@modules/Account/infra/typeorm/repositories/AccountsRepository';
import IAccountRepositories from '@modules/Account/repositories/IAccountsRepository';

import DiskStorageProvider from './providers/storageProvider/implementations/diskStorageProvider';
import IStorageProvider from './providers/storageProvider/models/IStorageProvider';

import IProjectRepository from '@modules/Project/repositories/IProjectRepository';
import ProjectRepositories from '@modules/Project/infra/typeorm/repositories/ProjectsRepository';

import ITaskRepository from '@modules/Task/repositories/ITasksRepository';
import TaskRepositories from '@modules/Task/infra/typeorm/repositories/TasksRepository';

container.registerSingleton<IAccountRepositories>(
  'AccountRepositories',
  AccountRepositories,
);

container.registerSingleton<IProjectRepository>(
  'ProjectRepositories',
  ProjectRepositories,
);

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<ITaskRepository>(
  'TaskRepositories',
  TaskRepositories,
);
