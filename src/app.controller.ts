import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('/')
@Controller()
export class AppController {
  @ApiOperation({ summary: 'Hello user' })
  @ApiResponse({ status: 200, description: 'Hello RS School User!' })
  @Get()
  getHello(): string {
    return 'REST Kanban service!';
  }
}
