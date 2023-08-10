import { Issue } from 'src/issue/entities/issue.entity';
import { Task } from 'src/task/entities/task.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class Label {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Issue, (issue) => issue.labels)
  issues: Issue[];

  @ManyToMany(() => Task, (task) => task.labels)
  tasks: Task[];
}
