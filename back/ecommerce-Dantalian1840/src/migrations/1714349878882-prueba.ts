/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Prueba1714349878882 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`CREATE TABLE TEST 
        id SERIAL PRIMARY KEY
    )`);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE TEST`);
  }
}

