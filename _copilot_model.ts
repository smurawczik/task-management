// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   OneToMany,
//   ManyToOne,
//   ManyToMany,
//   JoinTable,
// } from 'typeorm';

// @Entity()
// class Project {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   name: string;

//   @Column()
//   description: string;

//   @OneToMany(() => Sprint, (sprint) => sprint.project)
//   sprints: Sprint[];
// }

// @Entity()
// class User {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ unique: true })
//   email: string;

//   @Column()
//   password: string;

//   @Column()
//   firstName: string;

//   @Column()
//   lastName: string;

//   @ManyToMany(() => UserRoles, (userRoles) => userRoles.users)
//   @JoinTable({
//     name: 'user_has_roles',
//   })
//   roles: UserRoles[];

//   @OneToMany(() => Task, (task) => task.reporter)
//   reportedTasks: Task[];

//   @OneToMany(() => Task, (task) => task.assignee)
//   assignedTasks: Task[];

//   @OneToMany(() => Issue, (issue) => issue.reporter)
//   reportedIssues: Issue[];

//   @OneToMany(() => Issue, (issue) => issue.assignee)
//   assignedIssues: Issue[];

//   @OneToMany(() => Issue, (issue) => issue.assignee)
//   watchingIssues: Issue[];

//   @ManyToMany(() => Organization, (organization) => organization.members)
//   organizations: Organization[];

//   @OneToMany(() => Comment, (comment) => comment.author)
//   comments: Comment[];
// }

// @Entity()
// export class UserRoles {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   name: string;

//   @ManyToMany(() => User, (user) => user.roles)
//   users: User[];
// }

// @Entity()
// class Sprint {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   name: string;

//   @Column()
//   startDate: Date;

//   @Column()
//   endDate: Date;

//   @ManyToOne(() => Project, (project) => project.sprints)
//   project: Project;

//   @OneToMany(() => Issue, (issue) => issue.sprint)
//   issues: Issue[];

//   @OneToMany(() => Task, (task) => task.sprint)
//   tasks: Task[];
// }

// @Entity()
// class Issue {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   name: string;

//   @Column({ default: IssueStatus.TO_DO })
//   status: IssueStatus;

//   @Column({ default: Priority.LOW })
//   priority: Priority;

//   @ManyToOne(() => Sprint, (sprint) => sprint.issues)
//   sprint: Sprint;

//   @ManyToOne(() => User, (user) => user.reportedIssues)
//   reporter: User;

//   @ManyToOne(() => User, (user) => user.assignedIssues)
//   assignee: User;

//   @OneToMany(() => Comment, (comment) => comment.issue)
//   comments: Comment[];

//   @ManyToMany(() => Label, (label) => label.issues)
//   @JoinTable({
//     name: 'issue_has_labels',
//   })
//   labels: Label[];

//   @ManyToMany(() => User, (user) => user.watchingIssues)
//   @JoinTable({
//     name: 'issue_has_watchers',
//   })
//   watchers: User[];
// }

// @Entity()
// class Task {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   title: string;

//   @Column({ nullable: true })
//   description: string;

//   @Column({ default: TaskStatus.TO_DO })
//   status: TaskStatus;

//   @Column({ default: Priority.LOW })
//   priority: Priority;

//   @Column()
//   dueDate: Date;

//   @Column({ default: () => 'CURRENT_TIMESTAMP' })
//   createdAt: Date;

//   @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
//   updatedAt: Date;

//   @ManyToOne(() => Sprint, (sprint) => sprint.tasks)
//   sprint: Sprint;

//   @ManyToOne(() => User, (user) => user.assignedTasks)
//   assignee: User;

//   @ManyToOne(() => User, (user) => user.reportedTasks)
//   reporter: User;

//   @OneToMany(() => Comment, (comment) => comment.task)
//   comments: Comment[];

//   @ManyToMany(() => Label, (label) => label.issues)
//   @JoinTable({ name: 'task_has_labels' })
//   labels: Label[];

//   @ManyToOne(() => Board, (board) => board.tasks)
//   board: Board;
// }

// @Entity()
// class Comment {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   text: string;

//   @Column({ default: () => 'CURRENT_TIMESTAMP' })
//   createdAt: Date;

//   @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
//   updatedAt: Date;

//   @ManyToOne(() => User, (user) => user.comments)
//   author: User;

//   @ManyToOne(() => Task, (task) => task.comments)
//   task: Task;

//   @ManyToOne(() => Issue, (issue) => issue.comments)
//   issue: Issue;
// }

// @Entity()
// class Organization {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ unique: true })
//   name: string;

//   @ManyToMany(() => User, (user) => user.organizations)
//   @JoinTable({
//     name: 'organization_has_members',
//   })
//   members: User[];

//   @OneToMany(() => Board, (board) => board.organization)
//   boards: Board[];
// }

// @Entity()
// class Board {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   name: string;

//   @Column({ nullable: true })
//   description: string;

//   @Column()
//   dueDate: Date;

//   @Column({ default: () => 'CURRENT_TIMESTAMP' })
//   createdAt: Date;

//   @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
//   updatedAt: Date;

//   @OneToMany(() => Task, (task) => task.board)
//   tasks: Task[];

//   @ManyToOne(() => Organization, (organization) => organization.boards)
//   organization: Organization;
// }

// @Entity()
// class Label {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   name: string;

//   @ManyToMany(() => Issue, (issue) => issue.labels)
//   issues: Issue[];

//   @ManyToMany(() => Task, (task) => task.labels)
//   tasks: Task[];
// }

import { MigrationInterface, QueryRunner } from 'typeorm';

export class userRoles1691698835058 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // create a query to add user roles
    await queryRunner.query(`
            insert into user_roles (id, name) values ('1', 'admin');
            insert into user_roles (id, name) values ('2', 'user');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_roles');
  }
}

import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'task_management',
});
