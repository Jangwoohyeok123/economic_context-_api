import { CommonEntity } from 'src/api/common/entity/common.entity';
import { Context } from 'src/api/context/entity/context.entity';
import { Indicator } from 'src/api/indicator/entity/indicator.entity';
import { News } from 'src/api/news/entity/news.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';

@Entity({ schema: 'economic_context', name: 'journals' })
export class Journal extends CommonEntity {
  @Column('varchar', { name: 'title', length: 100 })
  title: string;

  @Column('varchar', { name: 'body', length: 4096 })
  body: string;

  @ManyToOne(() => Context, (context) => context.journals)
  @JoinColumn([{ name: 'context_id', referencedColumnName: 'id' }])
  context: Context;

  @ManyToMany(() => News, (news) => news.journals)
  news: News[];

  @ManyToMany(() => Indicator, (indicator) => indicator.journals)
  indicators: Indicator[];
}
