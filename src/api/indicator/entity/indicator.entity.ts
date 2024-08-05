import { Contexts } from 'src/api/context/entity/context.entity';
import { Journals } from 'src/api/journal/entity/journal.entity';
import { Column, Entity, JoinColumn, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'economic_context', name: 'indicators' })
export class Indicators {
  @PrimaryColumn('varchar', { name: 'id', length: 500 })
  id: string;

  @Column('varchar', { name: 'title', length: 500 })
  title: string;

  @Column({ type: 'int', name: 'categoryId' })
  categoryId: number;

  @Column('varchar', { name: 'notes', length: 4096, nullable: true })
  notes: string;

  @Column('varchar', { name: 'frequency', length: 64, nullable: true })
  frequency: string;

  @Column('int', { name: 'popularity' })
  popularity: number;

  @Column('varchar', { name: 'observation_end', length: 30, nullable: true })
  observation_end: string;

  @Column('varchar', { name: 'observation_start', length: 30, nullable: true })
  observation_start: string;

  // context indicator가 indicator를 참조한다.
  @ManyToMany(() => Contexts, (context) => context.indicators)
  @JoinColumn({ name: 'context_id' })
  contexts: Contexts[]; // indicator를 참조하는 context List

  // journal indicator가 indciator를 참조한다.
  @ManyToMany(() => Journals, (journal) => journal.indicators)
  @JoinColumn({ name: 'journal_id' })
  journals: Journals[]; // indicator를 참조하는 journal List
}
