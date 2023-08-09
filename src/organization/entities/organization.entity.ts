import { User } from '../../user/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  // Relations
  // Many-to-Many with User
  @ManyToMany(() => User, (user) => user.organizations)
  members: User[];

  // One-to-Many with Board
  // @OneToMany(() => Board, (board) => board.org)
  // boards: Board[];
}
