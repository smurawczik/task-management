import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Project, (project) => project.users)
  @JoinTable()
  projects: Project[];

  @OneToMany(() => Issue, (issue) => issue.assignee)
  assignedIssues: Issue[];

  @OneToMany(() => Issue, (issue) => issue.reporter)
  reportedIssues: Issue[];
}

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

@Entity()
export class Issue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  type: string;

  @Column()
  status: string;

  @ManyToOne(() => User, (user) => user.assignedIssues)
  assignee: User;

  @ManyToOne(() => User, (user) => user.reportedIssues)
  reporter: User;

  @ManyToOne(() => Project, (project) => project.issues)
  project: Project;

  @OneToMany(() => Comment, (comment) => comment.issue)
  comments: Comment[];

  @ManyToMany(() => Board, (board) => board.issues)
  @JoinTable()
  boards: Board[];

  @ManyToMany(() => Component, (component) => component.issues)
  @JoinTable()
  components: Component[];

  @ManyToMany(() => Version, (version) => version.issues)
  @JoinTable()
  versions: Version[];

  @ManyToOne(() => Sprint, (sprint) => sprint.issues)
  sprint: Sprint;

  @ManyToOne(() => Priority, (priority) => priority.issues)
  priority: Priority;
}

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.id)
  author: User;

  @ManyToOne(() => Issue, (issue) => issue.comments)
  issue: Issue;
}

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

@Entity()
export class Workflow {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Status, (status) => status.workflow)
  statuses: Status[];
}

@Entity()
export class Status {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Workflow, (workflow) => workflow.statuses)
  workflow: Workflow;

  @OneToMany(() => Issue, (issue) => issue.priority)
  issues: Issue[];
}

@Entity()
export class Priority {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Issue, (issue) => issue.priority)
  issues: Issue[];
}

@Entity()
export class Component {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Issue, (issue) => issue.components)
  issues: Issue[];
}

@Entity()
export class Version {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Issue, (issue) => issue.versions)
  issues: Issue[];
}

@Entity()
export class Attachment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  url: string;

  @ManyToOne(() => Issue, (issue) => issue.id)
  issue: Issue;
}

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  message: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
