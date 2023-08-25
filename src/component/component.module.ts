import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Issue } from 'src/issue/entities/issue.entity';
import { ComponentController } from './component.controller';
import { ComponentService } from './component.service';
import { Component } from './entities/component.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Component, Issue])],
  controllers: [ComponentController],
  providers: [ComponentService],
  exports: [TypeOrmModule],
})
export class ComponentModule {}
