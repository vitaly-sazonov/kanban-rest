import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, ValidateIf } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'Task: pet the cat', description: 'Task name' })
  @IsString()
  @IsNotEmpty()
  readonly title!: string;

  @ApiProperty({ example: 'Domestic cat needs to be stroked gently', description: 'Task description' })
  @IsString()
  @IsNotEmpty()
  readonly description!: string;

  @ApiProperty({ example: '40af606c-c0bb-47d1-bc20-a2857242cde3', description: 'ID of the user who owns the task' })
  @IsString()
  @ValidateIf((object, value) => value !== null)
  readonly userId!: string | null;
}
