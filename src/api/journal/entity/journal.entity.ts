import { Context } from 'src/api/context/entity/context.entity';
import { Indicators } from 'src/api/indicator/entity/indicator.entity';
import { News } from 'src/api/news/entity/news.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'economic_context', name: 'journals' })
export class Journals {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'title', length: 100 })
  title: string;

  @Column('varchar', { name: 'body', length: 4096 })
  body: string;

  @CreateDateColumn({ name: 'create_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Context, (context) => context.journals)
  @JoinColumn([{ name: 'context_id', referencedColumnName: 'id' }])
  context: Context;

  @ManyToMany(() => News, (news) => news.journals)
  news: News[];

  @ManyToMany(() => Indicators, (indicator) => indicator.journals)
  indicators: Indicators[];
}
