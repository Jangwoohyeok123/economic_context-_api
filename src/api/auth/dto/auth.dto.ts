import {
  IsString,
  IsBoolean,
  IsEmail,
  IsOptional,
  IsUrl,
} from 'class-validator';

export class CreateAuthGoogleDto {
  @IsString()
  readonly code: string;
}

export class GoogleUserDto {
  @IsString()
  id: string;

  @IsEmail()
  email: string;

  @IsBoolean()
  verified_email: boolean;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  given_name?: string;

  @IsString()
  @IsOptional()
  family_name?: string;

  @IsUrl()
  @IsOptional()
  picture?: string;

  @IsString()
  @IsOptional()
  locale?: string;
}
