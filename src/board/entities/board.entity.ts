import { Issue } from '../../issue/entities/issue.entity';
import { Project } from '../../project/entities/project.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Project, (project) => project.boards)
  project: Project;

  @ManyToMany(() => Issue, (issue) => issue.boards)
  issues: Issue[];
}
