import { Organization } from '../../organization/entities/organization.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task } from 'src/task/entities/task.entity';
import { UserRoles } from 'src/roles/entities/role.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @ManyToMany(() => UserRoles, (userRoles) => userRoles.users)
  @JoinTable({
    name: 'user_has_roles',
  })
  roles: UserRoles[];

  @OneToMany(() => Task, (task) => task.reporter)
  reportedTasks: Task[];

  @OneToMany(() => Task, (task) => task.assignee)
  assignedTasks: Task[];

  @OneToMany(() => Task, (task) => task.assignee)
  watchingTasks: Task[];

  @ManyToMany(() => Organization, (organization) => organization.members)
  organizations: Organization[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];
}
