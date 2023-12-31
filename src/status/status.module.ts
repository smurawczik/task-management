import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { Status } from './entities/status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workflow } from '../workflow/entities/workflow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Status, Workflow])],
  controllers: [StatusController],
  providers: [StatusService],
  exports: [TypeOrmModule],
})
export class StatusModule {}
