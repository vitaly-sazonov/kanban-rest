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

import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

import { BoardsService } from './boards.service';
import { IBoard, Board } from './boards.entity';

import getOne from './schema/controller.getOne';
import boards404 from './schema/controller.404';

import { AuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Boards')
@ApiBearerAuth('token')
@Controller('boards')
@UseGuards(AuthGuard)
export class BoardsController {
  constructor(private readonly boardService: BoardsService) {}

  @ApiOperation({ summary: 'Get all boards' })
  @ApiResponse({ status: 200, type: [Board] })
  @ApiResponse(boards404)
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<IBoard[]> {
    return this.boardService.getAll();
  }

  @ApiOperation({ summary: 'Get the board by id' })
  @ApiResponse({
    status: 200,
    schema: getOne,
  })
  @ApiResponse(boards404)
  @ApiParam({ name: 'id', description: 'ID Board' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id', ParseUUIDPipe) id: UUIDType): Promise<IBoard> {
    return this.boardService.getById(id);
  }

  @ApiOperation({ summary: 'Create board' })
  @ApiResponse({ status: 201, type: Board })
  @ApiResponse(boards404)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createBoardDto: CreateBoardDto): Promise<IBoard> {
    return this.boardService.create(createBoardDto);
  }

  @ApiOperation({ summary: 'Delete board' })
  @ApiResponse({ status: 204 })
  @ApiResponse(boards404)
  @ApiParam({ name: 'id', description: 'ID Board' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: UUIDType): Promise<void> {
    return this.boardService.remove(id);
  }

  @ApiOperation({ summary: 'Update board' })
  @ApiResponse({ status: 200, type: Board })
  @ApiResponse(boards404)
  @ApiParam({ name: 'id', description: 'ID Board' })
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id', ParseUUIDPipe) id: UUIDType, @Body() updateBoardDto: UpdateBoardDto): Promise<IBoard> {
    return this.boardService.update(id, updateBoardDto);
  }
}
