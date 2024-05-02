import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { Files } from '../entities/files.entity';
import { CloudinaryService } from './claudinary.service';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { FilesRepository } from './files.repository';
import { Products } from '../entities/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Files, Products])],
  controllers: [FilesController],
  providers: [
    FilesService,
    CloudinaryService,
    CloudinaryConfig,
    FilesRepository,
  ],
})
export class FilesModule {}
