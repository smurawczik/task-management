import { Module } from '@nestjs/common';
import { IssueService } from './issue.service';
import { IssueController } from './issue.controller';
import { Comment } from 'src/comment/entities/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Label } from 'src/label/entities/label.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Label])],
  controllers: [IssueController],
  providers: [IssueService],
  exports: [TypeOrmModule],
})
export class IssueModule {}
