import { MigrationInterface, QueryRunner } from 'typeorm';

export class RolChange1714945225786 implements MigrationInterface {
  name = 'RolChange1714945225786';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isAdmin"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "isAdmin" integer NOT NULL DEFAULT 1`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1e9ca59226e3cad7bbb10e7c00" ON "users" ("isAdmin") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1e9ca59226e3cad7bbb10e7c00"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isAdmin"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "isAdmin" boolean NOT NULL DEFAULT false`,
    );
  }
}

