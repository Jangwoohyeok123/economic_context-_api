import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'economic_context', name: 'indicators' })
export class Indicators {
  @PrimaryColumn('varchar', { name: 'id', length: 500 })
  id: string;

  @Column('varchar', { name: 'title', length: 500 })
  title: string;
}
