import { Issue } from '../../issue/entities/issue.entity';
import { Project } from '../../project/entities/project.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
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
}
