import { Board } from '../../board/entities/board.entity';
import { Component } from '../../component/entities/component.entity';
import { Priority } from '../../priority/entities/priority.entity';
import { Project } from '../../project/entities/project.entity';
import { Sprint } from '../../sprint/entities/sprint.entity';
import { User } from '../../user/entities/user.entity';
import { Version } from '../../version/entities/version.entity';
import { Comment } from '../../comment/entities/comment.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Label } from '../../label/entities/label.entity';
import { IssueType } from '../../issue-type/entities/issue-type.entity';
import { Status } from '../../status/entities/status.entity';

@Entity()
export class Issue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  dueDate: Date;

  @ManyToOne(() => IssueType, (issueType) => issueType.issues)
  type: IssueType;

  @ManyToOne(() => Status, (status) => status.issues)
  status: Status;

  @ManyToOne(() => User, (user) => user.assignedIssues)
  assignee: User;

  @ManyToOne(() => User, (user) => user.reportedIssues)
  reporter: User;

  @ManyToOne(() => Project, (project) => project.issues)
  project: Project;

  @OneToMany(() => Comment, (comment) => comment.issue)
  comments: Comment[];

  @ManyToMany(() => Board, (board) => board.issues)
  @JoinTable({ name: 'board_issues' })
  boards: Board[];

  @ManyToMany(() => Component, (component) => component.issues)
  @JoinTable({ name: 'component_issues' })
  components: Component[];

  @ManyToMany(() => Version, (version) => version.issues)
  @JoinTable({ name: 'version_issues' })
  versions: Version[];

  @ManyToMany(() => Label, (label) => label.issues)
  @JoinTable({ name: 'label_issues' })
  labels: Label[];

  @ManyToOne(() => Sprint, (sprint) => sprint.issues)
  sprint: Sprint;

  @ManyToOne(() => Priority, (priority) => priority.issues)
  priority: Priority;
}
