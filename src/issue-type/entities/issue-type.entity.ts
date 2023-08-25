import { Issue } from '../../issue/entities/issue.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class IssueType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Issue, (issue) => issue.type)
  issues: Issue[];
}
