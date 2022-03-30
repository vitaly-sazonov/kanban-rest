import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateBoardDto {
  @ApiProperty({ example: 'Homework tasks', description: 'Board title' })
  @IsString()
  @IsNotEmpty()
  readonly title!: string;
}
