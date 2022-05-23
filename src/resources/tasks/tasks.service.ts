import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateTaskDto } from './dto/create-tasks.dto';
import { UpdateTaskDto } from './dto/update-tasks.dto';

import { UsersService } from '../users/users.service';
import { BoardsService } from '../boards/boards.service';
import { ColumnsService } from '../columns/columns.service';

import { Task, ITask } from './tasks.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
    private columnRepository: ColumnsService,
    private boardRepository: BoardsService,
    private userRepository: UsersService,
  ) {}

  async getAll(boardId: UUIDType, columnId: UUIDType): Promise<ITask[]> {
    await this.boardRepository.isExist(boardId);
    await this.columnRepository.isExist(columnId);
    const resp = await this.tasksRepository
      .createQueryBuilder('tasks')
      .where({ boardId, columnId })
      .select([
        'tasks.id',
        'tasks.title',
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
    await this.boardRepository.isExist(boardId);
    await this.columnRepository.isExist(columnId);
    const task = await this.tasksRepository
      .createQueryBuilder('tasks')
      .where({ boardId, columnId, id: taskId })
      .select([
        'tasks.id',
        'tasks.title',
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
    await this.boardRepository.isExist(boardId);
    await this.columnRepository.isExist(columnId);
    await this.userRepository.getById(taskDto.userId as string);

    const task = (await this.tasksRepository.find({
      where: { boardId, columnId },
      order: { order: 'DESC' },
      take: 1,
    })) as Task[];
    const autoOrder = task.length ? task[0].order + 1 : 1;

    const modelTask = await this.tasksRepository.create({ ...taskDto, columnId, order: autoOrder, boardId }).save();
    return modelTask;
  }

  async remove(boardId: UUIDType, columnId: UUIDType, taskId: UUIDType): Promise<void> {
    await this.boardRepository.isExist(boardId);
    await this.columnRepository.isExist(columnId);
    const tasks = (await this.tasksRepository.find({
      where: { boardId, columnId },
      order: { order: 'ASC' },
    })) as Task[];

    const currentTask = tasks.find((task) => task.id === taskId);
    if (!currentTask) {
      throw new HttpException('Task was not founded!', HttpStatus.NOT_FOUND);
    }

    const arrayTasksToSort = tasks.filter((task) => task.order > currentTask.order);

    this.tasksRepository.manager.transaction(async (transact) => {
      await currentTask.remove();
      arrayTasksToSort.forEach(async (task) => {
        task.order -= 1;
        await transact.save(task);
      });
    });
  }

  // TODO: add functional to update when tasks moves between columns
  async update(boardId: UUIDType, columnId: UUIDType, taskId: UUIDType, body: UpdateTaskDto): Promise<ITask> {
    await this.boardRepository.isExist(boardId);
    await this.columnRepository.isExist(columnId);
    const tasks = (await this.tasksRepository.find({
      where: { boardId, columnId },
      order: { order: 'ASC' },
    })) as Task[];

    const currentTask = tasks.find((task) => task.id === taskId);
    if (!currentTask) {
      throw new HttpException('Task was not founded!', HttpStatus.NOT_FOUND);
    }

    if (body.order < 1) {
      throw new HttpException('The task order number cannot be less than 1!', HttpStatus.BAD_REQUEST);
    }

    currentTask.title = body.title;
    currentTask.description = body.description;
    currentTask.userId = body.userId;
    currentTask.boardId = body.boardId;

    if (currentTask.columnId !== body.columnId) {
      const tasksInOtherColumn = (await this.tasksRepository.find({
        where: { boardId, columnId: body.columnId },
        order: { order: 'ASC' },
      })) as Task[];

      if (tasksInOtherColumn.length + 1 < body.order) {
        throw new HttpException(
          'The task order number cannot be greater than the total number of tasks!',
          HttpStatus.BAD_REQUEST,
        );
      }

      tasksInOtherColumn.forEach((task) => {
        if (body.order <= task.order) {
          task.order += 1;
        }
      });

      tasks.forEach((task) => {
        if (currentTask.order < task.order) {
          task.order -= 1;
        }
      });

      currentTask.columnId = body.columnId;
      currentTask.order = body.order;

      this.tasksRepository.manager.transaction(async (transact) => {
        [...tasks, ...tasksInOtherColumn].forEach(async (record) => {
          await transact.save(record);
        });
      });

      return {
        id: taskId,
        title: body.title,
        order: body.order,
        description: body.description,
        userId: body.userId,
        boardId: body.boardId,
        columnId: body.columnId,
      } as Task;
    }

    if (currentTask.order !== body.order) {
      if (tasks.length + 1 < body.order) {
        throw new HttpException(
          'The task order number cannot be greater than the total number of tasks!',
          HttpStatus.BAD_REQUEST,
        );
      }

      this.columnRepository.transactSortingRecords(this.tasksRepository, tasks, currentTask, body.order);

      return {
        id: taskId,
        title: body.title,
        order: body.order,
        description: body.description,
        userId: body.userId,
        boardId: body.boardId,
        columnId: body.columnId,
      } as Task;
    }

    const data = await currentTask.save();
    return data;
  }
}
