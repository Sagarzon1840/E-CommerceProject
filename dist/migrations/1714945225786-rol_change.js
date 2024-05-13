"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolChange1714945225786 = void 0;
class RolChange1714945225786 {
    constructor() {
        this.name = 'RolChange1714945225786';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isAdmin"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isAdmin" integer NOT NULL DEFAULT 1`);
        await queryRunner.query(`CREATE INDEX "IDX_1e9ca59226e3cad7bbb10e7c00" ON "users" ("isAdmin") `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_1e9ca59226e3cad7bbb10e7c00"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isAdmin"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isAdmin" boolean NOT NULL DEFAULT false`);
    }
}
exports.RolChange1714945225786 = RolChange1714945225786;
//# sourceMappingURL=1714945225786-rol_change.js.map