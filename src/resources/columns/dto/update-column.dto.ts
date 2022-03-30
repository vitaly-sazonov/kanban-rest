import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class UpdateColumnDto {
  @ApiProperty({ example: 'Done', description: 'Column title' })
  @IsString()
  @IsNotEmpty()
  readonly title!: string;

  @ApiProperty({ example: '1', description: 'Column order' })
  @IsNumber()
  @IsNotEmpty()
  readonly order!: number;
}
