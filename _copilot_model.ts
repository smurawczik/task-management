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
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column('simple-array')
  role: string[];

  // Relations
  // One-to-Many with Task
  @OneToMany(() => Task, (task) => task.reporter)
  reportedTasks: Task[];

  @OneToMany(() => Task, (task) => task.assignee)
  assignedTasks: Task[];

  // Many-to-Many with Org
  @ManyToMany(() => Org, (org) => org.members)
  @JoinTable()
  orgs: Org[];

  // One-to-Many with Comment
  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];
}

@Entity()
class Org {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  // Relations
  // Many-to-Many with User
  @ManyToMany(() => User, (user) => user.orgs)
  members: User[];

  // One-to-Many with Board
  @OneToMany(() => Board, (board) => board.org)
  boards: Board[];
}

@Entity()
class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 'To Do' })
  status: string;

  @Column({ default: 'Low' })
  priority: string;

  @Column()
  dueDate: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  // Relations
  // One-to-Many with Task
  @OneToMany(() => Task, (task) => task.board)
  tasks: Task[];

  // Many-to-One with Org
  @ManyToOne(() => Org, (org) => org.boards)
  org: Org;
}

@Entity()
class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 'To Do' })
  status: string;

  @Column({ default: 'Low' })
  priority: string;

  @Column()
  dueDate: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  // Relations
  // Many-to-One with User
  @ManyToOne(() => User, (user) => user.assignedTasks)
  assignee: User;

  @ManyToOne(() => User, (user) => user.reportedTasks)
  reporter: User;

  // Many-to-One with Board
  @ManyToOne(() => Board, (board) => board.tasks)
  board: Board;

  // One-to-Many with Comment
  @OneToMany(() => Comment, (comment) => comment.task)
  comments: Comment[];
}

@Entity()
class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  // Relations
  // Many-to-One with User
  @ManyToOne(() => User, (user) => user.comments)
  author: User;

  // Many-to-One with Task
  @ManyToOne(() => Task, (task) => task.comments)
  task: Task;
}
