import { container } from 'tsyringe';

import AccountRepositories from '@modules/Account/infra/typeorm/repositories/accountRepositories';
import IAccountRepositories from '@modules/Account/repositories/IAccountRepositories';

import DiskStorageProvider from './storageProvider/implementations/diskStorageProvider';
import IStorageProvider from './storageProvider/models/IStorageProvider';

import IProjectRepository from '@modules/Project/repositories/IProjectRepository';
import ProjectRepositories from '@modules/Project/infra/typeorm/repositories/projectRepositories';
import ITaskRepository from '@modules/Task/repositories/ITaskRepositories';
import TaskRepositories from '@modules/Task/infra/typeorm/repositories/taskRepositories';

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
