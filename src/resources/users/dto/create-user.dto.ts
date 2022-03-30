import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Vasya', description: 'Username' })
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @ApiProperty({ example: 'user001', description: 'Login user' })
  @IsString()
  @IsNotEmpty()
  readonly login!: string;

  @ApiProperty({ example: 'userpass@123', description: 'Password user' })
  @IsString()
  @IsNotEmpty()
  readonly password!: string;
}
