"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionSoruce = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const config_1 = require("@nestjs/config");
(0, dotenv_1.config)({ path: '.env.development' });
const config = {
    type: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: ['dist/modules/entities/*.entity{.js,.ts}'],
    migrations: ['dist/migrations/*{.js,.ts}'],
    logging: true,
    autoLoadEntities: true,
    synchronize: false,
    dropSchema: false,
};
exports.default = (0, config_1.registerAs)('typeorm', () => config);
exports.connectionSoruce = new typeorm_1.DataSource(config);
//# sourceMappingURL=typeorm.js.map