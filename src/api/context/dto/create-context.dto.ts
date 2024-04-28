import { IsString, IsOptional, IsArray } from 'class-validator';
import { Indicators } from 'src/api/indicator/entity/indicator.entity';

export class CreateContextDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly label: string;

  @IsArray()
  @IsOptional()
  readonly customIndicators: Indicators[];
}
