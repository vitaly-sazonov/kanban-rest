import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column as ColumnPg, OneToMany, ManyToOne, Unique } from 'typeorm';

import { Task } from '../tasks/tasks.entity';
import { Board } from '../boards/boards.entity';

export interface IColumn {
  id: UUIDType;
  title: string;
  order: number;
}

/**
 * Class Board format.
 */
@Entity('columns')
export class Column extends BaseEntity {
  /** @public uuid record */
  @ApiProperty({ example: '08cc10f4-1aeb-4cce-9793-9fea8313b592', description: 'ID Column' })
  @PrimaryGeneratedColumn('uuid')
  id!: UUIDType;

  /** @public title board */
  @ApiProperty({ example: 'Done', description: 'Column title' })
  @ColumnPg()
  title!: string;

  /** @public the order of the column in the list */
  @ApiProperty({ example: '1', description: 'Column order' })
  @ColumnPg()
  order!: number;

  @ManyToOne(() => Board, (board) => board.columns, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  board!: Board;

  @ColumnPg({ nullable: true, select: false })
  boardId!: string | null;

  @OneToMany(() => Task, (task) => task.column, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  tasks!: Task[];
}
