import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { Column, IColumn } from './columns.entity';

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
        'tasks.done',
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
    const { id, title, order } = await this.columnsRepository.create({ ...columnDto, boardId }).save();
    return { id, title, order };
  }

  async remove(boardId: UUIDType, columnId: UUIDType): Promise<void> {
    await this.boardRepository.isExist(boardId);
    const column = (await this.columnsRepository.findOne({ where: { boardId, id: columnId } })) as Column;
    if (!column) {
      throw new HttpException('Column was not founded!', HttpStatus.NOT_FOUND);
    }
    await column.remove();
  }

  async update(boardId: UUIDType, columnId: UUIDType, body: UpdateColumnDto): Promise<IColumn> {
    await this.boardRepository.isExist(boardId);
    const column = (await this.columnsRepository.findOne({ where: { boardId, id: columnId } })) as Column;
    if (!column) {
      throw new HttpException('Column was not founded!', HttpStatus.NOT_FOUND);
    }

    column.title = body.title;
    column.order = body.order;
    const { id, title, order } = await column.save();
    return { id, title, order };
  }
}
