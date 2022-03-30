import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class SaveFileDto {
  @ApiProperty({ example: 'Done', description: 'Column title' })
  @IsUUID()
  @IsNotEmpty()
  readonly taskId!: string;
}
