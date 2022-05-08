import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { User, IUserNoId, IUser } from './users.entity';
import { genHashPassword } from '../../helpers/genHashPassword';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async getAll(): Promise<IUserNoId[]> {
    const resp = await this.usersRepository.find({ select: ['id', 'name', 'login'] });
    return resp;
  }

  async getById(id: UUIDType): Promise<IUserNoId> {
    const user = await this.usersRepository.findOne({ select: ['id', 'name', 'login'], where: { id } });
    if (!user) {
      throw new HttpException('User was not founded!', HttpStatus.NOT_FOUND);
    }
    return user as IUserNoId;
  }

  async create(userDto: IUser): Promise<IUserNoId> {
    try {
      const { name, login, password } = userDto;
      const hash = await genHashPassword(password);
      const modelUser = await this.usersRepository.create({ name, login, password: hash }).save();
      return { id: modelUser.id, name: modelUser.name, login: modelUser.login };
    } catch (e) {
      throw new HttpException('User login already exists!', HttpStatus.CONFLICT);
    }
  }

  async remove(id: UUIDType): Promise<void> {
    const user = (await this.usersRepository.findOne({ where: { id } })) as User;
    if (!user) {
      throw new HttpException('User was not founded!', HttpStatus.NOT_FOUND);
    }
    await user.remove();
  }

  async update(id: UUIDType, body: IUser): Promise<IUserNoId> {
    const user = (await this.usersRepository.findOne({ where: { id } })) as User;
    if (!user) {
      throw new HttpException('User was not founded!', HttpStatus.NOT_FOUND);
    }

    const password = await genHashPassword(body.password);

    user.name = body.name;
    user.login = body.login;
    user.password = password;
    const data = await user.save();

    return { id: data.id, name: data.name, login: data.login };
  }
}
