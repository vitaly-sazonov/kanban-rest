import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Entity, Unique, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Task } from '../tasks/tasks.entity';

export interface ILogin {
  login: string;
  password: string;
}
export interface IUser {
  name: string;
  login: string;
  password: string;
}
export interface IUserNoId {
  id: UUIDType;
  name: string;
  login: string;
}
/**
 * Class User format.
 */
@Entity('users')
@Unique(['login'])
export class User extends BaseEntity {
  /** @public uuid record */

  @ApiProperty({ example: '40af606c-c0bb-47d1-bc20-a2857242cde3', description: 'unique user ID' })
  @PrimaryGeneratedColumn('uuid')
  id!: UUIDType;

  /** @public name user */
  @ApiProperty({ example: 'Vasya', description: 'Username' })
  @Column()
  name!: string;

  /** @public login user */
  @ApiProperty({ example: 'user001', description: 'Login user' })
  @Column()
  login!: string;

  /** @public password user */
  @Column()
  password!: string;

  @OneToMany(() => Task, (task) => task.user, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  tasks!: string;
}
