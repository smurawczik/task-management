import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sprint } from 'src/sprint/entities/sprint.entity';
import { Task } from './entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Sprint])],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TypeOrmModule],
})
export class TaskModule {}
