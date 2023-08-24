import { UserRoles } from 'src/roles/entities/role.entity';
import { User } from 'src/user/entities/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Organization } from 'src/organization/entities/organization.entity';
import { Label } from 'src/label/entities/label.entity';
import { Project } from 'src/project/entities/project.entity';
import { Sprint } from 'src/sprint/entities/sprint.entity';
import { Task } from 'src/task/entities/task.entity';
import { Board } from 'src/board/entities/board.entity';
import { Status } from 'src/status/entities/status.entity';

export class Seed1691753449875 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const roles = [
      queryRunner.manager.create(UserRoles, {
        name: 'admin',
      }),
      queryRunner.manager.create(UserRoles, {
        name: 'user',
      }),
    ];
    await queryRunner.manager.save(roles);

    const organization = queryRunner.manager.create(Organization, {
      name: 'Test Organization',
    });
    await queryRunner.manager.save(organization);

    const statuses = [
      queryRunner.manager.create(Status, {
        order: 0,
        name: 'To Do',
      }),
      queryRunner.manager.create(Status, {
        order: 1,
        name: 'In Progress',
      }),
      queryRunner.manager.create(Status, {
        order: 2,
        name: 'Blocked',
      }),
      queryRunner.manager.create(Status, {
        order: 3,
        name: 'Done',
      }),
    ];

    await queryRunner.manager.save(statuses);

    const passwordHash = await bcrypt.hash('11111111', 10);
    const user = queryRunner.manager.create<User>(User, {
      email: 'sebastian.murawczik@gmail.com',
      password: passwordHash,
      firstName: 'Sebastian',
      lastName: 'Murawczik',
      roles: [roles[0]],
      organizations: [organization],
    });
    await queryRunner.manager.save(user);

    const frontendLabel = queryRunner.manager.create(Label, {
      name: 'Frontend',
    });
    const backendLabel = queryRunner.manager.create(Label, {
      name: 'Backend',
    });
    await queryRunner.manager.save([frontendLabel, backendLabel]);

    const project = queryRunner.manager.create<Project>(Project, {
      name: 'Test Project',
      description: 'Test Project Description',
    });

    await queryRunner.manager.save(project);

    const sprint = queryRunner.manager.create(Sprint, {
      name: 'Test Sprint',
      startDate: new Date(),
      endDate: new Date(),
      project,
    });

    await queryRunner.manager.save(sprint);

    const task = queryRunner.manager.create(Task, {
      title: 'Test Task TODO',
      description: 'Test Task Description',
      dueDate: new Date(),
      assignee: user,
      reporter: user,
      sprint,
      labels: [frontendLabel, backendLabel],
      status: statuses[0],
    });

    const task2 = queryRunner.manager.create(Task, {
      title: 'Test Task IN PROGRESS',
      description: 'Test Task Description',
      dueDate: new Date(),
      assignee: user,
      reporter: user,
      labels: [frontendLabel, backendLabel],
      status: statuses[1],
    });

    const task3 = queryRunner.manager.create(Task, {
      title: 'Test Task TODO AGAIN',
      description: 'Test Task Description',
      dueDate: new Date(),
      assignee: user,
      reporter: user,
      labels: [frontendLabel, backendLabel],
      status: statuses[0],
    });

    await queryRunner.manager.save([task, task2, task3]);

    const board = queryRunner.manager.create(Board, {
      name: 'Test Board',
      dueDate: new Date(),
      tasks: [],
    });

    task.board = board;
    task2.board = board;
    board.tasks = [task, task2];

    await queryRunner.manager.save(board);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(UserRoles, { name: 'admin' });
    await queryRunner.manager.delete(UserRoles, { name: 'user' });
    await queryRunner.manager.delete(User, {
      email: 'sebastian.murawczik@gmail.com',
    });
  }
}
