import { Issue } from 'src/issue/entities/issue.entity';
import { Project } from 'src/project/entities/project.entity';
import { Task } from 'src/task/entities/task.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Sprint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @ManyToOne(() => Project, (project) => project.sprints)
  project: Project;

  @OneToMany(() => Issue, (issue) => issue.sprint)
  issues: Issue[];

  @OneToMany(() => Task, (task) => task.sprint)
  tasks: Task[];
}
