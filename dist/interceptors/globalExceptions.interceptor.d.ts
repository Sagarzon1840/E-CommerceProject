import { ExceptionFilter } from '@nestjs/common';
export declare class GlobalExceptionFilter implements ExceptionFilter {
    catch(error: Error, host: any): void;
}
