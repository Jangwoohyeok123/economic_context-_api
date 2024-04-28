import { IsString, IsOptional, IsArray } from 'class-validator';
import { Indicators } from 'src/api/indicator/entity/indicator.entity';

export class UpdateContextDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsOptional()
  readonly label: string;

  @IsArray()
  @IsOptional()
  readonly customIndicators?: Indicators[];
}
