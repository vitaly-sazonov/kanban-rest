import { v4 as uuid } from 'uuid';
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  StreamableFile,
  HttpException,
} from '@nestjs/common';
import { existsSync, createReadStream } from 'fs';
import { join } from 'path';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { Express } from 'express';
import { diskStorage } from 'multer';

import { AuthGuard } from '../auth/jwt-auth.guard';
import { FileFastifyInterceptor } from './files.interceptor';
import { FileService } from './files.service';
import { SaveFileDto } from './dto/save-file.dto';

@ApiTags('Upload/Download file')
@ApiBearerAuth('token')
@Controller()
@UseGuards(AuthGuard)
export class FileController {
  constructor(private fileService: FileService) {}

  @ApiOperation({ summary: 'Upload file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        taskId: {
          type: 'string',
        },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'File uploaded' })
  @Post('/file')
  @UseInterceptors(
    FileFastifyInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => cb(null, uuid()),
      }),
    }),
  )
  @HttpCode(HttpStatus.OK)
  upload(@UploadedFile() file: Express.Multer.File, @Body() body: SaveFileDto): Promise<string> {
    const { taskId } = body;
    const { originalname, filename, size } = file;
    return this.fileService.saveFilename(originalname, filename, size, taskId);
  }

  @ApiOperation({ summary: 'Download file' })
  @ApiResponse({ status: 200 })
  @ApiParam({ name: 'taskid', description: 'Task id associated with the file' })
  @ApiParam({ name: 'filename', description: 'Filename to download' })
  @Get('/file/:taskid/:filename')
  @HttpCode(HttpStatus.OK)
  async download(@Param('taskid') reqTaskId: string, @Param('filename') reqFilename: string): Promise<StreamableFile> {
    const fileId = await this.fileService.findFileId(reqTaskId, reqFilename);
    const filepath = join(process.cwd(), `/uploads/${fileId}`);
    if (existsSync(filepath)) {
      const stream = createReadStream(filepath);
      return new StreamableFile(stream);
    }
    throw new HttpException('File was not founded!', HttpStatus.NOT_FOUND);
  }
}
