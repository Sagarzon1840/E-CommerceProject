import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UsersModule, ProductsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
