import { Journals } from 'src/api/journal/entity/journal.entity';
import { Contexts } from '../entity/context.entity';

export class ResponseContextDto {
  id: number;
  name: string;
  label: string;
  createdAt: Date;
  updatedAt: Date;
  journals: Journals[];

  constructor(context: Contexts) {
    this.id = context.id;
    this.name = context.name;
    this.label = context.label;
    this.createdAt = context.createdAt;
    this.updatedAt = context.updatedAt;
    this.journals = context.journals;
  }
}
