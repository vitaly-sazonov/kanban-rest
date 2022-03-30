import { BaseEntity, Entity, Unique, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Task } from '../tasks/tasks.entity';

@Entity('files')
@Unique('file_unique_constraint', ['filename', 'taskId'])
export class File extends BaseEntity {
  /** @public Column filename */
  @Column()
  filename!: string;

  /** @public Column fileId */
  @PrimaryColumn()
  fileId!: UUIDType;

  /** @public Column fileSize */
  @Column()
  fileSize!: number;

  /** @public Column taskId */
  @Column({ nullable: false })
  taskId!: UUIDType;

  @ManyToOne(() => Task, (task) => task.files, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  task!: Task;
}
