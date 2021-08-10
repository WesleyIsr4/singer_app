import Account from '@modules/Account/infra/typeorm/entities/account';
import Task from '@modules/Task/infra/typeorm/entities/task';
import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('project')
class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  type: string;

  @Column()
  user_id: string;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'user_id' })
  user: Account;

  @OneToMany(() => Task, task => task.project)
  tasks: Task[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'taskPercente' })
  getTaskPercente(): number {
    const totalFinished = this.tasks.filter(t => t.status === 'FINISHED');
    const percent = Math.round(
      (totalFinished.length * 100) / this.tasks.length,
    );
    return percent | Number('0');
  }

  @Expose({ name: 'totalTask' })
  getTotal(): number {
    return this.tasks.length;
  }

  @Expose({ name: 'TotalTaskCompleted' })
  getTotalCompleted(): number {
    const totalFinished = this.tasks.filter(t => t.status === 'FINISHED');
    return totalFinished.length;
  }
}

export default Project;
