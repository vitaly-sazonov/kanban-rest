import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column as ColumnPg,
  JoinColumn,
  OneToMany,
  ManyToOne,
  Unique,
} from 'typeorm';

import { Column } from '../columns/columns.entity';
import { Board } from '../boards/boards.entity';
import { User } from '../users/users.entity';
import { File } from '../file/files.entity';

export interface ITask {
  id: UUIDType;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  board: string;
  boardId: string | null;
  columnId: string | null;
}

@Entity('tasks')
export class Task extends BaseEntity {
  /** @public record uuid */
  @ApiProperty({ example: '40af606c-c0bb-47d1-bc20-a2857242cde3', description: 'Unique task ID' })
  @PrimaryGeneratedColumn('uuid')
  id!: UUIDType;

  /** @public title column */
  @ApiProperty({ example: 'Task: pet the cat', description: 'Task title' })
  @ColumnPg()
  title!: string;

  /** @public the order of the task in the list */
  @ApiProperty({ example: '1', description: 'Task order' })
  @ColumnPg()
  order!: number;

  /** @public task description */
  @ApiProperty({ example: 'Domestic cat needs to be stroked gently', description: 'Task description' })
  @ColumnPg()
  description!: string;

  /** @public user uuid */
  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: string;

  /** @public user uuid */
  @ApiProperty({ example: '40af606c-c0bb-47d1-bc20-a2857242cde3', description: 'ID of the User who owns the Task' })
  @ColumnPg({ nullable: true })
  userId!: string | null;

  /** @public board uuid */
  @ManyToOne(() => Board, (board) => board.tasks, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'boardId' })
  board!: string;

  @ApiProperty({
    example: '8d3bad56-ad8a-495d-9500-18ae4d1de8dc',
    description: 'ID of the Board to which the belongs Task',
  })
  @ColumnPg({ nullable: true })
  boardId!: string | null;

  /** @public column uuid */
  @ManyToOne(() => Column, (column) => column.tasks, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'columnId' })
  column!: string;

  @ApiProperty({
    example: '41344d09-b995-451f-93dc-2f17ae13a4a9',
    description: 'ID of the Column to which the belongs Task',
  })
  @ColumnPg({ nullable: true })
  columnId!: string;

  @ApiProperty({
    example: [
      {
        filename: 'foto.jpg',
        fileSize: 6105000,
      },
    ],
    description: 'Array of files associated with the task',
  })
  @OneToMany(() => File, (file) => file.task, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  files!: File[];
}
