import { Module } from '@nestjs/common';
import { SprintService } from './sprint.service';
import { SprintController } from './sprint.controller';
import { Project } from 'src/project/entities/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Issue } from 'src/issue/entities/issue.entity';
import { Task } from 'src/task/entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Issue, Task])],
  controllers: [SprintController],
  providers: [SprintService],
  exports: [TypeOrmModule],
})
export class SprintModule {}
