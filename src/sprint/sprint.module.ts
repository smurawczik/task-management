import { Module } from '@nestjs/common';
import { SprintService } from './sprint.service';
import { SprintController } from './sprint.controller';
import { Project } from 'src/project/entities/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Issue } from 'src/issue/entities/issue.entity';
import { Task } from 'src/task/entities/task.entity';
import { Sprint } from './entities/sprint.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sprint, Project, Issue, Task])],
  controllers: [SprintController],
  providers: [SprintService],
  exports: [TypeOrmModule],
})
export class SprintModule {}
