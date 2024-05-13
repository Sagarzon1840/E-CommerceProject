import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class RolChange1714945225786 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
