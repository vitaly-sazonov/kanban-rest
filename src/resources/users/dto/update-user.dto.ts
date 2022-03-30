import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'Vasya', description: 'Username' })
  @IsString()
  readonly name!: string;

  @ApiProperty({ example: 'user001', description: 'Login user' })
  @IsString()
  readonly login!: string;

  @ApiProperty({ example: 'userpass@123', description: 'Password user' })
  @IsString()
  readonly password!: string;
}
