import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'economic_context', name: 'indicators' })
export class Indicators {
  @PrimaryColumn('varchar', { name: 'seriesId', length: 500 })
  seriesId: string;

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
}
