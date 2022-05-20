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
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

import { CreateTaskDto } from './dto/create-tasks.dto';
import { UpdateTaskDto } from './dto/update-tasks.dto';

import { TasksService } from './tasks.service';
import { ITask, Task } from './tasks.entity';

import TaskCreate from './schema/controller.create';
import TaskUpdate from './schema/controller.update';

import { AuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Tasks')
@ApiBearerAuth('token')
@Controller('/boards/:boardId/columns/:columnId/tasks/')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, type: [Task] })
  @ApiParam({ name: 'boardId', description: 'ID Board' })
  @ApiParam({ name: 'columnId', description: 'ID Column' })
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(
    @Param('boardId', ParseUUIDPipe) boardId: UUIDType,
    @Param('columnId', ParseUUIDPipe) columnId: UUIDType,
  ): Promise<ITask[]> {
    return this.taskService.getAll(boardId, columnId);
  }

  @ApiOperation({ summary: 'Get the task by id' })
  @ApiResponse({ status: 200, type: Task })
  @ApiParam({ name: 'boardId', description: 'ID Board' })
  @ApiParam({ name: 'columnId', description: 'ID Column' })
  @ApiParam({ name: 'taskId', description: 'ID Task' })
  @Get(':taskId')
  @HttpCode(HttpStatus.OK)
  getOne(
    @Param('boardId', ParseUUIDPipe) boardId: UUIDType,
    @Param('columnId', ParseUUIDPipe) columnId: UUIDType,
    @Param('taskId', ParseUUIDPipe) taskId: UUIDType,
  ): Promise<ITask> {
    return this.taskService.getById(boardId, columnId, taskId);
  }

  @ApiOperation({ summary: 'Create task' })
  @ApiResponse({ status: 201, schema: TaskCreate })
  @ApiParam({ name: 'boardId', description: 'ID Board' })
  @ApiParam({ name: 'columnId', description: 'ID Column' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('boardId', ParseUUIDPipe) boardId: UUIDType,
    @Param('columnId', ParseUUIDPipe) columnId: UUIDType,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<ITask> {
    return this.taskService.create(boardId, columnId, createTaskDto);
  }

  @ApiOperation({ summary: 'Delete task' })
  @ApiResponse({ status: 204 })
  @ApiParam({ name: 'boardId', description: 'ID Board' })
  @ApiParam({ name: 'columnId', description: 'ID Column' })
  @ApiParam({ name: 'taskId', description: 'ID Task' })
  @Delete(':taskId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('boardId', ParseUUIDPipe) boardId: UUIDType,
    @Param('columnId', ParseUUIDPipe) columnId: UUIDType,
    @Param('taskId', ParseUUIDPipe) taskId: UUIDType,
  ): Promise<void> {
    return this.taskService.remove(boardId, columnId, taskId);
  }

  @ApiOperation({ summary: 'Update task' })
  @ApiResponse({ status: 200, schema: TaskUpdate })
  @ApiParam({ name: 'boardId', description: 'ID Board' })
  @ApiParam({ name: 'columnId', description: 'ID Column' })
  @ApiParam({ name: 'taskId', description: 'ID Task' })
  @Put(':taskId')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('boardId', ParseUUIDPipe) boardId: UUIDType,
    @Param('columnId', ParseUUIDPipe) columnId: UUIDType,
    @Param('taskId', ParseUUIDPipe) taskId: UUIDType,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<ITask> {
    return this.taskService.update(boardId, columnId, taskId, updateTaskDto);
  }
}
