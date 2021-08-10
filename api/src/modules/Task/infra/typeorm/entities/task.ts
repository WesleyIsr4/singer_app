import Account from '@modules/Account/infra/typeorm/entities/account';
import Project from '@modules/Project/infra/typeorm/entities/project';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('task')
class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  date: string;

  @Column()
  project_id: string;

  @Column()
  user_id: string;

  @Column()
  status: string;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'user_id' })
  user: Account;

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Task;
