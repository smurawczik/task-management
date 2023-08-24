import { Board } from 'src/board/entities/board.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Label } from 'src/label/entities/label.entity';
import { Sprint } from 'src/sprint/entities/sprint.entity';
import { Status } from 'src/status/entities/status.entity';
import { User } from 'src/user/entities/user.entity';
import { Priority } from 'src/utils/enums';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: Priority.LOW })
  priority: Priority;

  @Column()
  dueDate: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => Status, (status) => status.task)
  status: Status;

  @ManyToOne(() => Sprint, (sprint) => sprint.tasks)
  sprint: Sprint;

  @ManyToOne(() => User, (user) => user.assignedTasks)
  assignee: User;

  @ManyToOne(() => User, (user) => user.reportedTasks)
  reporter: User;

  @ManyToOne(() => User, (user) => user.watchingTasks)
  watcher: User;

  @OneToMany(() => Comment, (comment) => comment.task)
  comments: Comment[];

  @ManyToMany(() => Label, (label) => label.tasks)
  @JoinTable({ name: 'task_has_labels' })
  labels: Label[];

  @ManyToOne(() => Board, (board) => board.tasks)
  board: Board;
}
