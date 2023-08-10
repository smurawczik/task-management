import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationModule } from './organization/organization.module';
import { ProjectModule } from './project/project.module';
import { RolesModule } from './roles/roles.module';
import { SprintModule } from './sprint/sprint.module';
import { IssueModule } from './issue/issue.module';
import { TaskModule } from './task/task.module';
import { CommentModule } from './comment/comment.module';
import { BoardModule } from './board/board.module';
import { LabelModule } from './label/label.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'task_management',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
      migrationsTableName: 'task_management_migrations',
      migrations: ['src/database/migrations/*.ts'],
      dropSchema: true,
    }),
    UserModule,
    OrganizationModule,
    ProjectModule,
    RolesModule,
    SprintModule,
    IssueModule,
    TaskModule,
    CommentModule,
    BoardModule,
    LabelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
