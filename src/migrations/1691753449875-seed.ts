import * as bcrypt from 'bcrypt';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { Board } from '../board/entities/board.entity';
import { Issue } from '../issue/entities/issue.entity';
import { Label } from '../label/entities/label.entity';
import { Project } from '../project/entities/project.entity';
import { Role } from '../roles/entities/role.entity';
import { Sprint } from '../sprint/entities/sprint.entity';
import { Status } from '../status/entities/status.entity';
import { User } from '../user/entities/user.entity';

export class Seed1691753449875 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const roles = [
      queryRunner.manager.create(Role, {
        name: 'admin',
      }),
      queryRunner.manager.create(Role, {
        name: 'user',
      }),
    ];
    await queryRunner.manager.save(roles);

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
      users: [user],
    });

    const project2 = queryRunner.manager.create<Project>(Project, {
      name: 'Test Project 2',
      description: 'Test Project Description 33',
      users: [user],
    });

    await queryRunner.manager.save([project, project2]);

    const sprint = queryRunner.manager.create(Sprint, {
      name: 'Test Sprint',
      startDate: new Date(),
      endDate: new Date(),
      project,
      issues: [],
    });

    await queryRunner.manager.save(sprint);

    const task = queryRunner.manager.create(Issue, {
      title: 'Test Task TODO',
      description: 'Test Task Description',
      dueDate: new Date(),
      assignee: user,
      reporter: user,
      sprint,
      labels: [frontendLabel, backendLabel],
      status: statuses[0],
    });

    const task2 = queryRunner.manager.create(Issue, {
      title: 'Test Task IN PROGRESS',
      description: 'Test Task Description',
      dueDate: new Date(),
      assignee: user,
      reporter: user,
      labels: [frontendLabel, backendLabel],
      status: statuses[1],
    });

    const task3 = queryRunner.manager.create(Issue, {
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
      issues: [],
    });

    task.boards = [board];
    task2.boards = [board];
    board.issues = [task, task2, task3];

    await queryRunner.manager.save(board);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(Role, { name: 'admin' });
    await queryRunner.manager.delete(Role, { name: 'user' });
    await queryRunner.manager.delete(User, {
      email: 'sebastian.murawczik@gmail.com',
    });
  }
}
