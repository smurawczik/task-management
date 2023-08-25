import { Issue } from '../../issue/entities/issue.entity';
import { User } from '../../user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
