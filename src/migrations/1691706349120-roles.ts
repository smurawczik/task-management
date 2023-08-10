import { UserRoles } from 'src/roles/entities/role.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Roles1691706349120 implements MigrationInterface {
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(UserRoles, { name: 'admin' });
    await queryRunner.manager.delete(UserRoles, { name: 'user' });
  }
}
