import { Board } from 'src/board/entities/board.entity';
import { Label } from 'src/label/entities/label.entity';
import { Sprint } from 'src/sprint/entities/sprint.entity';
import { User } from 'src/user/entities/user.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { TaskStatus, Priority } from 'src/utils/enums';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: TaskStatus.TO_DO })
  status: TaskStatus;

  @Column({ default: Priority.LOW })
  priority: Priority;

  @Column()
  dueDate: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => Sprint, (sprint) => sprint.tasks)
  sprint: Sprint;

  @ManyToOne(() => User, (user) => user.assignedTasks)
  assignee: User;

  @ManyToOne(() => User, (user) => user.reportedTasks)
  reporter: User;

  @OneToMany(() => Comment, (comment) => comment.task)
  comments: Comment[];

  @ManyToMany(() => Label, (label) => label.issues)
  @JoinTable({ name: 'task_has_labels' })
  labels: Label[];

  @ManyToOne(() => Board, (board) => board.tasks)
  board: Board;
}
