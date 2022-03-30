import {
  ParseUUIDPipe,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

import getOne from './schema/controller.getOne';

import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

import { ColumnsService } from './columns.service';
import { IColumn, Column } from './columns.entity';

import boards404 from '../boards/schema/controller.404';
import columns404 from './schema/controller.404';

import { AuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Columns')
@ApiBearerAuth('token')
@Controller('/boards/:boardId/columns')
@UseGuards(AuthGuard)
export class ColumnsController {
  constructor(private readonly columnService: ColumnsService) {}

  @ApiOperation({ summary: 'Get all columns' })
  @ApiResponse({ status: 200, type: [Column] })
  @ApiResponse(boards404)
  @ApiResponse(columns404)
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(@Param('boardId', ParseUUIDPipe) boardId: UUIDType): Promise<IColumn[]> {
    return this.columnService.getAll(boardId);
  }

  @ApiOperation({ summary: 'Get the column by id' })
  @ApiResponse({ status: 200, schema: getOne })
  @ApiResponse(boards404)
  @ApiResponse(columns404)
  @ApiParam({ name: 'columnId', description: 'ID Column' })
  @Get(':columnId')
  @HttpCode(HttpStatus.OK)
  getOne(
    @Param('boardId', ParseUUIDPipe) boardId: UUIDType,
    @Param('columnId', ParseUUIDPipe) columnId: UUIDType,
  ): Promise<IColumn> {
    return this.columnService.getById(boardId, columnId);
  }

  @ApiOperation({ summary: 'Create column' })
  @ApiResponse({ status: 201, type: Column })
  @ApiResponse(boards404)
  @ApiResponse(columns404)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('boardId', ParseUUIDPipe) boardId: UUIDType,
    @Body() createColumnDto: CreateColumnDto,
  ): Promise<IColumn> {
    return this.columnService.create(boardId, createColumnDto);
  }

  @ApiOperation({ summary: 'Delete column' })
  @ApiResponse({ status: 204 })
  @ApiResponse(boards404)
  @ApiResponse(columns404)
  @ApiParam({ name: 'columnId', description: 'ID Column' })
  @Delete(':columnId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('boardId', ParseUUIDPipe) boardId: UUIDType,
    @Param('columnId', ParseUUIDPipe) columnId: UUIDType,
  ): Promise<void> {
    return this.columnService.remove(boardId, columnId);
  }

  @ApiOperation({ summary: 'Update column' })
  @ApiResponse({ status: 200, type: Column })
  @ApiResponse(boards404)
  @ApiResponse(columns404)
  @ApiParam({ name: 'columnId', description: 'ID Column' })
  @Put(':columnId')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('boardId', ParseUUIDPipe) boardId: UUIDType,
    @Param('columnId', ParseUUIDPipe) columnId: UUIDType,
    @Body() updateColumnDto: UpdateColumnDto,
  ): Promise<IColumn> {
    return this.columnService.update(boardId, columnId, updateColumnDto);
  }
}
