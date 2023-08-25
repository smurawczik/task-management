import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../comment/entities/comment.entity';
import { Label } from '../label/entities/label.entity';
import { Priority } from '../priority/entities/priority.entity';
import { Version } from '../version/entities/version.entity';
import { Issue } from './entities/issue.entity';
import { IssueController } from './issue.controller';
import { IssueService } from './issue.service';
import { Component } from '../component/entities/component.entity';
import { IssueType } from 'src/issue-type/entities/issue-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Component,
      Version,
      Comment,
      Label,
      Priority,
      IssueType,
      Issue,
    ]),
  ],
  controllers: [IssueController],
  providers: [IssueService],
  exports: [TypeOrmModule],
})
export class IssueModule {}
