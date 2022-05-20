import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

import { Board, IBoard } from './boards.entity';

@Injectable()
export class BoardsService {
  constructor(@InjectRepository(Board) private boardsRepository: Repository<Board>) {}

  async isExist(id: UUIDType) {
    const resp = await this.boardsRepository.findOne({ where: { id } });
    if (!resp) {
      throw new HttpException('Board was not founded!', HttpStatus.NOT_FOUND);
    }
    return !!resp;
  }

  async getAll(): Promise<IBoard[]> {
    const resp = await this.boardsRepository.find();
    return resp;
  }

  async getById(id: UUIDType): Promise<IBoard> {
    const board = await this.boardsRepository
      .createQueryBuilder('boards')
      .where({ id })
      .select([
        'boards.id',
        'boards.title',
        'boards.description',
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
      .leftJoin('boards.columns', 'columns')
      .leftJoin('columns.tasks', 'tasks')
      .leftJoin('tasks.files', 'files')
      .getOne();
    if (!board) {
      throw new HttpException('Board was not founded!', HttpStatus.NOT_FOUND);
    }
    return board as IBoard;
  }

  async create(boardDto: CreateBoardDto): Promise<IBoard> {
    const board = new Board();
    board.title = boardDto.title;
    board.description = boardDto.description;
    const modelBoard = await this.boardsRepository.save(board);
    return modelBoard;
  }

  async remove(id: UUIDType): Promise<void> {
    const board = (await this.boardsRepository.findOne({ where: { id } })) as Board;
    if (!board) {
      throw new HttpException('Board was not founded!', HttpStatus.NOT_FOUND);
    }
    await board.remove();
  }

  async update(id: UUIDType, body: UpdateBoardDto): Promise<IBoard> {
    const board = (await this.boardsRepository.findOne({ where: { id } })) as Board;
    if (!board) {
      throw new HttpException('Board was not founded!', HttpStatus.NOT_FOUND);
    }

    board.title = body.title;
    board.description = body.description;
    const data = await board.save();
    return data;
  }
}
