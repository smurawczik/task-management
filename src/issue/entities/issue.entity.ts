import { IssueStatus, Priority } from 'src/utils/enums';
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

@Entity()
export class Issue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: IssueStatus.TO_DO })
  status: IssueStatus;

  @Column({ default: Priority.LOW })
  priority: Priority;

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
