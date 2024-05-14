"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const logger_1 = require("./middlewares/logger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const PORT = process.env.PORT || 3000;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('API BackEnd Módulo 4')
        .setDescription('Demo creada en Nest JS para el proyecto del módulo 4')
        .setVersion('1.0')
        .addTag('API')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.use(logger_1.LoggerGlobalMiddleware);
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map