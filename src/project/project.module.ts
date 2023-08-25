import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, User])],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [TypeOrmModule],
})
export class ProjectModule {}
