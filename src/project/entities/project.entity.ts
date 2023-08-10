import { Sprint } from 'src/sprint/entities/sprint.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Sprint, (sprint) => sprint.project)
  sprints: Sprint[];
}
