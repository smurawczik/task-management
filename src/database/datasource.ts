import { Board } from 'src/board/entities/board.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Issue } from 'src/issue/entities/issue.entity';
import { Label } from 'src/label/entities/label.entity';
import { Organization } from 'src/organization/entities/organization.entity';
import { Project } from 'src/project/entities/project.entity';
import { UserRoles } from 'src/roles/entities/role.entity';
import { Sprint } from 'src/sprint/entities/sprint.entity';
import { Status } from 'src/status/entities/status.entity';
import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'task_management',
  entities: [
    UserRoles,
    User,
    Status,
    Task,
    Comment,
    Board,
    Issue,
    Label,
    Organization,
    Project,
    Sprint,
  ],
  migrations: ['dist/src/migrations/*.js'],
});
