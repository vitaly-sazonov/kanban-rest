import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { Column, IColumn } from './columns.entity';

import { Task } from '../tasks/tasks.entity';

import { BoardsService } from '../boards/boards.service';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(Column) private columnsRepository: Repository<Column>,
    private boardRepository: BoardsService,
  ) {}

  async isExist(id: UUIDType) {
    const resp = await this.columnsRepository.findOne({ where: { id } });
    if (!resp) {
      throw new HttpException('Column was not founded!', HttpStatus.NOT_FOUND);
    }
    return !!resp;
  }

  async getAll(boardId: UUIDType): Promise<IColumn[]> {
    await this.boardRepository.isExist(boardId);
    const resp = await this.columnsRepository.find({ select: ['id', 'title', 'order'], where: { boardId } });
    return resp;
  }

  async getById(boardId: UUIDType, columnId: UUIDType): Promise<IColumn> {
    await this.boardRepository.isExist(boardId);
    const column = await this.columnsRepository
      .createQueryBuilder('columns')
      .where({ boardId, id: columnId })
      .select([
        'columns.id',
        'columns.title',
        'columns.order',
        'tasks.id',
        'tasks.title',
        'tasks.order',
        'tasks.description',
        'tasks.userId',
        'files.filename',
        'files.fileSize',
      ])
      .leftJoin('columns.tasks', 'tasks')
      .leftJoin('tasks.files', 'files')
      .getOne();

    if (!column) {
      throw new HttpException('Column was not founded!', HttpStatus.NOT_FOUND);
    }
    return column as IColumn;
  }

  async create(boardId: UUIDType, columnDto: CreateColumnDto): Promise<IColumn> {
    await this.boardRepository.isExist(boardId);

    const columns = (await this.columnsRepository.find({
      where: { boardId },
      order: { order: 'DESC' },
      take: 1,
    })) as Column[];

    const autoOrder = columns.length ? columns[0].order + 1 : 1;

    const { id, title, order } = await this.columnsRepository
      .create({ ...columnDto, order: autoOrder, boardId })
      .save();
    return { id, title, order };
  }

  async remove(boardId: UUIDType, columnId: UUIDType): Promise<void> {
    await this.boardRepository.isExist(boardId);

    const columns = (await this.columnsRepository.find({
      where: { boardId },
      order: { order: 'ASC' },
    })) as Column[];

    const currentColumn = columns.find((column) => column.id === columnId);
    if (!currentColumn) {
      throw new HttpException('Column was not founded!', HttpStatus.NOT_FOUND);
    }

    const arrayColumnsToSort = columns.filter((column) => column.order > currentColumn.order);

    this.columnsRepository.manager.transaction(async (transact) => {
      await currentColumn.remove();
      arrayColumnsToSort.forEach(async (column) => {
        column.order -= 1;
        await transact.save(column);
      });
    });
  }

  transactSortingRecords(
    repository: Repository<Column | Task>,
    records: (Column | Task)[],
    currentRecord: Column | Task,
    moveTo: number,
  ) {
    const range = currentRecord.order - moveTo;
    const arrayTasksToSort = records.filter((record) =>
      range < 0
        ? record.order >= currentRecord.order && record.order <= moveTo
        : record.order <= currentRecord.order && record.order >= moveTo,
    );

    repository.manager.transaction(async (transact) => {
      arrayTasksToSort.forEach(async (record) => {
        if (range < 0) record.order -= 1;
        else record.order += 1;
        await transact.save(record);
      });

      currentRecord.order = moveTo;
      await transact.save(currentRecord);
    });
  }

  async update(boardId: UUIDType, columnId: UUIDType, body: UpdateColumnDto): Promise<IColumn> {
    await this.boardRepository.isExist(boardId);

    const columns = (await this.columnsRepository.find({
      where: { boardId },
      order: { order: 'ASC' },
    })) as Column[];

    const currentColumn = columns.find((column) => column.id === columnId);
    if (!currentColumn) {
      throw new HttpException('Column was not founded!', HttpStatus.NOT_FOUND);
    }

    if (body.order < 1) {
      throw new HttpException('The column order number cannot be less than 1!', HttpStatus.BAD_REQUEST);
    }

    if (columns.length + 1 < body.order) {
      throw new HttpException(
        'The column order number cannot be greater than the total number of columns!',
        HttpStatus.BAD_REQUEST,
      );
    }

    currentColumn.title = body.title;

    if (currentColumn.order !== body.order) {
      this.transactSortingRecords(this.columnsRepository, columns, currentColumn, body.order);
      return { id: columnId, title: body.title, order: body.order } as Column;
    }

    const data = await currentColumn.save();
    return data;
  }
}
