import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Issue } from '../../issue/entities/issue.entity';
import { Project } from '../../project/entities/project.entity';
import { Role } from '../../roles/entities/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Project, (project) => project.users)
  @JoinTable({ name: 'user_projects' })
  projects: Project[];

  @ManyToMany(() => Role, (roles) => roles.users)
  @JoinTable({ name: 'user_roles' })
  roles: Role[];

  @OneToMany(() => Issue, (issue) => issue.assignee)
  assignedIssues: Issue[];

  @OneToMany(() => Issue, (issue) => issue.reporter)
  reportedIssues: Issue[];
}
