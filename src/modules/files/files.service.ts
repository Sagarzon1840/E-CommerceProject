import { Injectable } from '@nestjs/common';
import { FilesRepository } from './files.repository';

@Injectable()
export class FilesService {
  constructor(private filesRepository: FilesRepository) {}

  uploadImage(id: string, file) {
    console.log('until this OK');

    return this.filesRepository.save(id, file);
  }
}
