import { Board } from 'src/board/entities/board.entity';
import { User } from '../../user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => User, (user) => user.organizations)
  @JoinTable({
    name: 'organization_has_members',
  })
  members: User[];

  @OneToMany(() => Board, (board) => board.organization)
  boards: Board[];
}
