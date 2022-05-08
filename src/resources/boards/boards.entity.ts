import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column as ColumnPg, OneToMany } from 'typeorm';

import { Task } from '../tasks/tasks.entity';
import { Column } from '../columns/columns.entity';

import { CreateColumnDto } from '../columns/dto/create-column.dto';

export interface IColumn {
  id: UUIDType;
  title: string;
  order: number;
}
export interface IBoard {
  id: UUIDType;
  title: string;
  description: string;
}

/**
 * Class Board format.
 */
@Entity('boards')
export class Board extends BaseEntity {
  /** @public uuid record */
  @ApiProperty({ example: '9a111e19-24ec-43e1-b8c4-13776842b8d5', description: 'ID Board' })
  @PrimaryGeneratedColumn('uuid')
  id!: UUIDType;

  /** @public title board */
  @ApiProperty({ example: 'Homework tasks', description: 'Board title' })
  @ColumnPg()
  title!: string;

  /** @public description board */
  @ApiProperty({ example: 'My board tasks', description: 'Board description' })
  @ColumnPg()
  description!: string;

  /** @public array of objects the column */
  @OneToMany(() => Column, (column) => column.board, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  columns!: CreateColumnDto[];

  @OneToMany(() => Task, (task) => task.board, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  tasks!: Task[];
}
