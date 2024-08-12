import { Journal } from 'src/api/journal/entity/journal.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

/* 
  @api https://newsapi.org/docs/endpoints/everything
*/
@Entity({ schema: 'economic_context', name: 'news' })
export class News {
  @PrimaryGeneratedColumn({ type: 'int', name: 'news_id' })
  newsId: number;

  @Column('varchar', { name: 'author', length: 200 })
  author: string;

  @Column('varchar', { name: 'title', length: 200 })
  title: string;

  @Column('varchar', { name: 'description', length: 1024 })
  description: string;

  @Column('varchar', { name: 'url', length: 516 })
  url: string;

  @Column('varchar', { name: 'urlToImage', length: 516 })
  urlToImage: string;

  @Column('datetime', { name: 'publishedAt' })
  publishedAt: Date;

  @Column('varchar', { name: 'content', length: 2048 })
  content: string;

  @ManyToOne(() => Journal, (journal) => journal.news)
  @JoinColumn([{ name: 'journal_id', referencedColumnName: 'id' }])
  journal: Journal;
}
