import { NoPkCommonEntity } from 'src/api/common/entity/common.entity';
import { Journal } from 'src/api/journal/entity/journal.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'economic_context', name: 'indicators' })
export class Indicator extends NoPkCommonEntity {
  @PrimaryColumn('varchar', { name: 'id', length: 500 })
  id: string;

  // @Column('varchar', { name: 'title', length: 500 })
  // title: string;

  // @Column({ type: 'int', name: 'categoryId' })
  // category_id: number;

  // @Column('varchar', { name: 'notes', length: 4096, nullable: true })
  // notes: string;

  // @Column('varchar', { name: 'frequency', length: 64, nullable: true })
  // frequency: string;

  // @Column('int', { name: 'popularity' })
  // popularity: number;

  // @Column('varchar', { name: 'observation_end', length: 30, nullable: true })
  // observation_end: string;

  // @Column('varchar', { name: 'observation_start', length: 30, nullable: true })
  // observation_start: string;

  @ManyToOne(() => Journal, (journal) => journal.indicators)
  @JoinColumn([{ name: 'journal_id', referencedColumnName: 'id' }])
  journal: Journal;
}
