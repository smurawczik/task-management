import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { Organization } from './entities/organization.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from 'src/board/entities/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Organization, Board])],
  controllers: [OrganizationController],
  providers: [OrganizationService],
  exports: [TypeOrmModule],
})
export class OrganizationModule {}
