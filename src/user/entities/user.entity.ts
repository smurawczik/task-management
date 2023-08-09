import { Organization } from '../../organization/entities/organization.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
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

  // @Column({ nullable: true })
  // role: string[];

  // Relations
  // One-to-Many with Task
  // @OneToMany(() => Task, (task) => task.reporter)
  // reportedTasks: Task[];

  // @OneToMany(() => Task, (task) => task.assignee)
  // assignedTasks: Task[];

  // Many-to-Many with Org
  @ManyToMany(() => Organization, (org) => org.members)
  @JoinTable()
  organizations: Organization[];

  // // One-to-Many with Comment
  // @OneToMany(() => Comment, (comment) => comment.author)
  // comments: Comment[];
}
