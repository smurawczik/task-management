import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Issue } from '../issue/entities/issue.entity';
import { Project } from '../project/entities/project.entity';
import { Sprint } from './entities/sprint.entity';
import { SprintController } from './sprint.controller';
import { SprintService } from './sprint.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sprint, Project, Issue])],
  controllers: [SprintController],
  providers: [SprintService],
  exports: [TypeOrmModule],
})
export class SprintModule {}
