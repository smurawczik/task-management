import { Issue } from '../../issue/entities/issue.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Version {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Issue, (issue) => issue.versions)
  issues: Issue[];
}
