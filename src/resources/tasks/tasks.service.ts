import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateTaskDto } from './dto/create-tasks.dto';
import { UpdateTaskDto } from './dto/update-tasks.dto';

import { BoardsService } from '../boards/boards.service';
import { ColumnsService } from '../columns/columns.service';

import { Task, ITask } from './tasks.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
    private columnRepository: ColumnsService,
    private boardRepository: BoardsService,
  ) {}

  async getAll(boardId: UUIDType, columnId: UUIDType): Promise<ITask[]> {
    this.boardRepository.isExist(boardId);
    this.columnRepository.isExist(columnId);
    const resp = await this.tasksRepository
      .createQueryBuilder('tasks')
      .where({ boardId, columnId })
      .select([
        'tasks.id',
        'tasks.title',
        'tasks.done',
        'tasks.order',
        'tasks.description',
        'tasks.userId',
        'tasks.boardId',
        'tasks.columnId',
        'files.filename',
        'files.fileSize',
      ])
      .leftJoin('tasks.files', 'files')
      .getMany();
    return resp;
  }

  async getById(boardId: UUIDType, columnId: UUIDType, taskId: UUIDType): Promise<ITask> {
    this.boardRepository.isExist(boardId);
    this.columnRepository.isExist(columnId);
    const task = await this.tasksRepository
      .createQueryBuilder('tasks')
      .where({ boardId, columnId, id: taskId })
      .select([
        'tasks.id',
        'tasks.title',
        'tasks.done',
        'tasks.order',
        'tasks.description',
        'tasks.userId',
        'tasks.boardId',
        'tasks.columnId',
        'files.filename',
        'files.fileSize',
      ])
      .leftJoin('tasks.files', 'files')
      .getOne();
    if (!task) {
      throw new HttpException('Task was not founded!', HttpStatus.NOT_FOUND);
    }
    return task;
  }

  async create(boardId: UUIDType, columnId: UUIDType, taskDto: CreateTaskDto): Promise<ITask> {
    this.boardRepository.isExist(boardId);
    this.columnRepository.isExist(columnId);
    const { done } = taskDto;
    const modelTask = await this.tasksRepository.create({ ...taskDto, done: !!done, columnId, boardId }).save();
    return modelTask;
  }

  async remove(boardId: UUIDType, columnId: UUIDType, taskId: UUIDType): Promise<void> {
    this.boardRepository.isExist(boardId);
    this.columnRepository.isExist(columnId);
    const task = (await this.tasksRepository.findOne({ where: { boardId, columnId, id: taskId } })) as Task;
    if (!task) {
      throw new HttpException('Task was not founded!', HttpStatus.NOT_FOUND);
    }
    await task.remove();
  }

  async update(boardId: UUIDType, columnId: UUIDType, taskId: UUIDType, body: UpdateTaskDto): Promise<ITask> {
    this.boardRepository.isExist(boardId);
    this.columnRepository.isExist(columnId);
    const task = (await this.tasksRepository.findOne({ where: { boardId, columnId, id: taskId } })) as Task;
    if (!task) {
      throw new HttpException('Task was not founded!', HttpStatus.NOT_FOUND);
    }

    task.title = body.title;
    task.order = body.order;
    task.done = !!body.done;
    task.description = body.description;
    task.userId = body.userId;
    task.boardId = body.boardId;
    task.columnId = body.columnId;
    const data = await task.save();
    return data;
  }
}
