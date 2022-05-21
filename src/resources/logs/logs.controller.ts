import { join } from 'path';
import { existsSync, createReadStream } from 'fs';
import { Controller, Get, HttpCode, HttpStatus, HttpException, StreamableFile } from '@nestjs/common';

@Controller('/logs')
export class LogsController {
  @Get('/error')
  @HttpCode(HttpStatus.OK)
  getErrors(): StreamableFile {
    const filepath = join(process.cwd(), `/logs/error.log`);
    if (existsSync(filepath)) {
      const stream = createReadStream(filepath);
      return new StreamableFile(stream);
    }

    throw new HttpException('File was not founded!', HttpStatus.NOT_FOUND);
  }

  @Get('/info')
  @HttpCode(HttpStatus.OK)
  getInfo(): StreamableFile {
    const filepath = join(process.cwd(), `/logs/info.log`);
    if (existsSync(filepath)) {
      const stream = createReadStream(filepath);
      return new StreamableFile(stream);
    }

    throw new HttpException('File was not founded!', HttpStatus.NOT_FOUND);
  }
}
