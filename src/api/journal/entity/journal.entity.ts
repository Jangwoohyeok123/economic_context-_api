import { CommonEntity } from 'src/api/common/entity/common.entity';
import { Context } from 'src/api/context/entity/context.entity';
import { Indicator } from 'src/api/indicator/entity/indicator.entity';
import { News } from 'src/api/news/entity/news.entity';
import {
  JoinColumn,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ schema: 'economic_context', name: 'journals' })
export class Journal extends CommonEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'journal_id' })
  journalId: number;

  @Column('varchar', { name: 'title', length: 100 })
  title: string;

  @Column('varchar', { name: 'body', length: 4096 })
  body: string;

  @ManyToOne(() => Context, (context) => context.journals)
  @JoinColumn([{ name: 'context_id', referencedColumnName: 'contextId' }])
  context: Context;

  @OneToMany(() => News, (news) => news.journal)
  news: News[];

  @OneToMany(() => Indicator, (indicator) => indicator.journal)
  indicators: Indicator[];
}
