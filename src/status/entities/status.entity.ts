import { Issue } from 'src/issue/entities/issue.entity';
import { Task } from 'src/task/entities/task.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Status {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  order: number;

  @OneToOne(() => Task, (task) => task.status)
  task: Task;

  @OneToOne(() => Issue, (issue) => issue.status)
  issue: Issue;
}
