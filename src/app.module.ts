import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AttachmentModule } from './attachment/attachment.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { BoardModule } from './board/board.module';
import { CommentModule } from './comment/comment.module';
import { ComponentModule } from './component/component.module';
import { IssueTypeModule } from './issue-type/issue-type.module';
import { IssueModule } from './issue/issue.module';
import { LabelModule } from './label/label.module';
import { NotificationModule } from './notification/notification.module';
import { PriorityModule } from './priority/priority.module';
import { ProjectModule } from './project/project.module';
import { SprintModule } from './sprint/sprint.module';
import { StatusModule } from './status/status.module';
import { UserModule } from './user/user.module';
import { VersionModule } from './version/version.module';
import { WorkflowModule } from './workflow/workflow.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'task_management',
      synchronize: true,
      autoLoadEntities: true,
      migrationsTableName: 'task_management_migrations',
      migrations: ['src/database/migrations/*.ts'],
      dropSchema: true,
    }),
    UserModule,
    ProjectModule,
    RolesModule,
    SprintModule,
    CommentModule,
    BoardModule,
    LabelModule,
    AuthenticationModule,
    StatusModule,
    IssueModule,
    WorkflowModule,
    PriorityModule,
    ComponentModule,
    VersionModule,
    AttachmentModule,
    NotificationModule,
    IssueTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
