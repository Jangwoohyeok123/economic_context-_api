import { CommonEntity } from 'src/api/common/entity/common.entity';
import { Indicators } from 'src/api/indicator/entity/indicator.entity';
import { Journal } from 'src/api/journal/entity/journal.entity';
import { Tag } from 'src/api/tag/entity/tag.entity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';

@Entity({ schema: 'economic_context', name: 'contexts' })
export class Context extends CommonEntity {
  @Column('varchar', { name: 'name', length: 100 })
  name: string;

  @Column('varchar', { name: 'description', length: 100, nullable: true })
  description: string;

  @ManyToMany(() => Tag, (tag) => tag.contexts)
  tags: Tag[];

  @OneToMany(() => Journal, (journal) => journal.context)
  journals: Journal[];

  @ManyToMany(() => Indicators, (indicator) => indicator.contexts)
  indicators: Indicators[];
}
