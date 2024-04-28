import { Indicators } from 'src/api/indicator/entity/indicator.entity';
import { Journals } from 'src/api/journal/entity/journal.entity';
import { Contexts } from '../entity/context.entity';

export class ResponseContextDto {
  id: number;
  name: string;
  label: string;
  customIndicators: Indicators[];
  createdAt: Date;
  updatedAt: Date;
  journals: Journals[];

  constructor(context: Contexts, customIndicators: Indicators[]) {
    this.id = context.id;
    this.name = context.name;
    this.label = context.label;
    this.customIndicators = customIndicators;
    this.createdAt = context.createdAt;
    this.updatedAt = context.updatedAt;
    this.journals = context.journals;
  }
}
