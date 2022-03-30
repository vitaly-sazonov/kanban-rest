import {
  ParseUUIDPipe,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { UsersService } from './users.service';
import { IUserNoId, User } from './users.entity';

import status404 from './schema/controller.404';

import { AuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Users')
@ApiBearerAuth('token')
@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @ApiResponse(status404)
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<IUserNoId[]> {
    return this.userService.getAll();
  }

  @ApiOperation({ summary: 'Get the user by id' })
  @ApiResponse({ status: 200, type: User })
  @ApiResponse(status404)
  @ApiParam({ name: 'id', description: 'ID User' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id', ParseUUIDPipe) id: UUIDType): Promise<IUserNoId> {
    return this.userService.getById(id);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 204 })
  @ApiResponse(status404)
  @ApiParam({ name: 'id', description: 'ID User' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: UUIDType): Promise<void> {
    return this.userService.remove(id);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, type: User })
  @ApiResponse(status404)
  @ApiParam({ name: 'id', description: 'ID User' })
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id', ParseUUIDPipe) id: UUIDType, @Body() updateUserDto: UpdateUserDto): Promise<IUserNoId> {
    return this.userService.update(id, updateUserDto);
  }
}
