import { Component } from 'src/component/entities/component.entity';
import { DataSource } from 'typeorm';
import { Attachment } from '../attachment/entities/attachment.entity';
import { Board } from '../board/entities/board.entity';
import { Comment } from '../comment/entities/comment.entity';
import { IssueType } from '../issue-type/entities/issue-type.entity';
import { Issue } from '../issue/entities/issue.entity';
import { Label } from '../label/entities/label.entity';
import { Project } from '../project/entities/project.entity';
import { Role } from '../roles/entities/role.entity';
import { Sprint } from '../sprint/entities/sprint.entity';
import { Status } from '../status/entities/status.entity';
import { User } from '../user/entities/user.entity';
import { Workflow } from '../workflow/entities/workflow.entity';
import { Version } from 'src/version/entities/version.entity';
import { Priority } from 'src/priority/entities/priority.entity';

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'task_management',
  dropSchema: true,
  entities: [
    Attachment,
    Board,
    Comment,
    Component,
    Version,
    Priority,
    Role,
    User,
    Workflow,
    Status,
    Label,
    Project,
    Issue,
    IssueType,
    Sprint,
  ],
  migrations: ['dist/src/migrations/*.js'],
});
