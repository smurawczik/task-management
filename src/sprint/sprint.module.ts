import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/project/entities/project.entity';
import { Task } from 'src/task/entities/task.entity';
import { Sprint } from './entities/sprint.entity';
import { SprintController } from './sprint.controller';
import { SprintService } from './sprint.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sprint, Project, Task])],
  controllers: [SprintController],
  providers: [SprintService],
  exports: [TypeOrmModule],
})
export class SprintModule {}
