import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sprint } from 'src/sprint/entities/sprint.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Task } from './entities/task.entity';
import { Label } from 'src/label/entities/label.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Sprint, Comment, Label])],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TypeOrmModule],
})
export class TaskModule {}
