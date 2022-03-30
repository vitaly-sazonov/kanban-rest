/* eslint-disable */
import {
  CallHandler,
  ExecutionContext,
  Inject,
  NestInterceptor,
  Optional,
  Type,
  Injectable,
  BadRequestException,
  HttpStatus,
  HttpException,
  PayloadTooLargeException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import FastifyMulter from 'fastify-multer';
import { Options, Multer } from 'multer';

import { FileService } from './files.service';

const multerExceptions = {
  LIMIT_PART_COUNT: 'Too many parts',
  LIMIT_FILE_SIZE: 'File too large',
  LIMIT_FILE_COUNT: 'Too many files',
  LIMIT_FIELD_KEY: 'Field name too long',
  LIMIT_FIELD_VALUE: 'Field value too long',
  LIMIT_FIELD_COUNT: 'Too many fields',
  LIMIT_UNEXPECTED_FILE: 'Unexpected field',
};

function transformException(error: Error | undefined) {
  if (!error || error instanceof HttpException) {
    return error;
  }
  switch (error.message) {
    case multerExceptions.LIMIT_FILE_SIZE:
      return new PayloadTooLargeException(error.message);
    case multerExceptions.LIMIT_FILE_COUNT:
    case multerExceptions.LIMIT_FIELD_KEY:
    case multerExceptions.LIMIT_FIELD_VALUE:
    case multerExceptions.LIMIT_FIELD_COUNT:
    case multerExceptions.LIMIT_UNEXPECTED_FILE:
    case multerExceptions.LIMIT_PART_COUNT:
      return new BadRequestException(error.message);
    default:
      return new BadRequestException(error.message);
  }
}

type MulterInstance = any;
export function FileFastifyInterceptor(fieldName: string, localOptions?: Options): Type<NestInterceptor> {
  @Injectable()
  class FileInterceptor implements NestInterceptor {
    protected multer: MulterInstance;
    constructor(
      private fileService: FileService,
      @Optional()
      @Inject('MULTER_MODULE_OPTIONS')
      private options: Multer,
    ) {}

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
      const ctx = context.switchToHttp();
      const req = ctx.getRequest();

      const fileFilter = async (_: any, file: any, next: any) => {
        const isExistInDB = await this.fileService.checkExistFileInDB(req.body.taskId, file.originalname);

        if (isExistInDB) {
          return next(new HttpException('File already exists!', HttpStatus.CONFLICT), false);
        }

        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return next(new HttpException('Only image files are allowed!', HttpStatus.CONFLICT), false);
        }

        next(null, true);
      };

      this.multer = (FastifyMulter as any)({ ...this.options, ...localOptions, fileFilter });

      await new Promise<void>((resolve, reject) =>
        this.multer.single(fieldName)(req, ctx.getResponse(), (err: any) => {
          if (err) {
            const error = transformException(err);
            return reject(error);
          }
          resolve();
        }),
      );

      return next.handle();
    }
  }
  return FileInterceptor as Type<NestInterceptor>;
}
