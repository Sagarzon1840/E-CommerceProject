import { FilesRepository } from './files.repository';
export declare class FilesService {
    private filesRepository;
    constructor(filesRepository: FilesRepository);
    uploadImage(id: string, file: any): Promise<string>;
}
