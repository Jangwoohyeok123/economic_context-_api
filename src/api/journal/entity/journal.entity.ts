import { Contexts } from 'src/api/context/entity/context.entity';
import { Indicators } from 'src/api/indicator/entity/indicator.entity';
import { News } from 'src/api/news/entity/news.entity';
import { Users } from 'src/api/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // user의 journals 속성은 journal를 참조한다.
  @ManyToOne(() => Users, (user) => user.journals)
  user: Users; // journal을 작성한 user

  @ManyToOne(() => Contexts, (context) => context.journals)
  context: Contexts; // journal이 속한 context

  @ManyToMany(() => News, (news) => news.journals)
  news: News[]; // journal이 참조하는 news List

  // indicator의 journals 속성은 journal을 참조한다.
  @ManyToMany(() => Indicators, (indicator) => indicator.journals)
  indicators: Indicators[]; // journal이 참조하는 indicator List
}
