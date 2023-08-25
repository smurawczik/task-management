import { Board } from '../../board/entities/board.entity';
import { Issue } from '../../issue/entities/issue.entity';
import { Sprint } from '../../sprint/entities/sprint.entity';
import { User } from '../../user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Issue, (issue) => issue.project)
  issues: Issue[];

  @OneToMany(() => Sprint, (sprint) => sprint.project)
  sprints: Sprint[];

  @ManyToMany(() => User, (user) => user.projects)
  users: User[];

  @OneToMany(() => Board, (board) => board.project)
  boards: Board[];
}
