import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';

import { File } from './files.entity';
import { FileController } from './files.controller';
import { FileService } from './files.service';

@Module({
  controllers: [FileController],
  providers: [FileService],
  imports: [AuthModule, TypeOrmModule.forFeature([File])],
  exports: [FileService],
})
export class FileModule {}
