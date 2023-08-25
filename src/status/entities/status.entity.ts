import { Issue } from '../../issue/entities/issue.entity';
import { Workflow } from '../../workflow/entities/workflow.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Status {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  order: number;

  @ManyToOne(() => Workflow, (workflow) => workflow.statuses)
  workflow: Workflow;

  @OneToMany(() => Issue, (issue) => issue.priority)
  issues: Issue[];
}
