import { IsString } from 'class-validator';

export class CreateJournalDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly body: string;
}
