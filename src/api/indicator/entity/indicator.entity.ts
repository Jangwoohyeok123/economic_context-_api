import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'economic_context', name: 'indicators' })
export class Indicators {
  @PrimaryColumn('varchar', { name: 'seriesId', length: 500 })
  seriesId: string;

  @Column('varchar', { name: 'title', length: 500 })
  title: string;

  @Column({ type: 'int', name: 'categoryId' })
  categoryId: number;
}
