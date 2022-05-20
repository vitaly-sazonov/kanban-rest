import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, ValidateIf, IsOptional } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({ example: 'Task: pet the cat', description: 'Task title' })
  @IsString()
  @IsNotEmpty()
  readonly title!: string;

  @ApiProperty({ example: '1', description: 'Task order' })
  @IsNumber()
  @IsNotEmpty()
  readonly order!: number;

  @ApiProperty({ example: 'Domestic cat needs to be stroked gently', description: 'Task description' })
  @IsString()
  @IsNotEmpty()
  readonly description!: string;

  @ApiProperty({ example: '40af606c-c0bb-47d1-bc20-a2857242cde3', description: 'ID of the User who owns the Task' })
  @IsString()
  @ValidateIf((object, value) => value !== null)
  readonly userId!: string | null;

  @ApiProperty({
    example: '8d3bad56-ad8a-495d-9500-18ae4d1de8dc',
    description: 'ID of the Board to which the belongs Task',
  })
  @IsString()
  @ValidateIf((object, value) => value !== null)
  readonly boardId!: string | null;

  @ApiProperty({
    example: '41344d09-b995-451f-93dc-2f17ae13a4a9',
    description: 'ID of the Column to which the belongs Task',
  })
  @IsString()
  @IsOptional()
  @ValidateIf((object, value) => value !== null)
  readonly columnId!: string;
}
