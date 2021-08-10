import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddAvatarToUser1626569078354 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'account',
      new TableColumn({
        name: 'avatar',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('account', 'avatar');
  }
}
