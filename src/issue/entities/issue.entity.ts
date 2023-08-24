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
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Issue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: Priority.LOW })
  priority: Priority;

  @OneToOne(() => Status, (status) => status.issue)
  @JoinColumn()
  status: Status;

  @ManyToOne(() => Sprint, (sprint) => sprint.issues)
  sprint: Sprint;

  @ManyToOne(() => User, (user) => user.reportedIssues)
  reporter: User;

  @ManyToOne(() => User, (user) => user.assignedIssues)
  assignee: User;

  @OneToMany(() => Comment, (comment) => comment.issue)
  comments: Comment[];

  @ManyToMany(() => Label, (label) => label.issues)
  @JoinTable({
    name: 'issue_has_labels',
  })
  labels: Label[];

  @ManyToMany(() => User, (user) => user.watchingIssues)
  @JoinTable({
    name: 'issue_has_watchers',
  })
  watchers: User[];
}
