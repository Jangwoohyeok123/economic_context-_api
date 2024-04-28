import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray } from 'class-validator';
import { Indicators } from 'src/api/indicator/entity/indicator.entity';

export class CreateContextDto {
  @ApiProperty({ example: 'APLLE', description: '투자 지표' })
  @IsString()
  readonly name: string;

  @IsString()
  readonly label: string;

  @IsArray()
  @IsOptional()
  readonly customIndicators: Indicators[];
}
