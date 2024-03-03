import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly google_id: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly picture_url: string;
}
