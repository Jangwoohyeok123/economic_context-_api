import { CommonEntity } from 'src/api/common/entity/common.entity';
import { Indicators } from 'src/api/indicator/entity/indicator.entity';
import { Journals } from 'src/api/journal/entity/journal.entity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';

@Entity({ schema: 'economic_context', name: 'contexts' })
export class Context extends CommonEntity {
  @Column('varchar', { name: 'name', length: 100 })
  name: string;

  @OneToMany(() => Journals, (journal) => journal.context)
  journals: Journals[];

  @ManyToMany(() => Indicators, (indicator) => indicator.contexts)
  indicators: Indicators[];
}
