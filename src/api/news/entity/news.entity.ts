import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/* 
  @api https://newsapi.org/docs/endpoints/everything
*/
@Entity({ schema: 'economic_context', name: 'news' })
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { name: 'author', length: 200 })
  author: string;

  @Column('varchar', { name: 'title', length: 1000 })
  title: string;

  @Column('varchar', { name: 'description', length: 5000 })
  description: string;

  @Column('varchar', { name: 'url', length: 1000 })
  url: string;

  @Column('varchar', { name: 'urlToImage', length: 1000 })
  urlToImage: string;

  @Column('datetime', { name: 'publishedAt' })
  publishedAt: Date;

  @Column('varchar', { name: 'content', length: 20000 })
  content: string;
}
