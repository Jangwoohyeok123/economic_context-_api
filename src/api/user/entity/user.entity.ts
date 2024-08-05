import { Contexts } from 'src/api/context/entity/context.entity';
import { Journals } from 'src/api/journal/entity/journal.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ schema: 'economic_context', name: 'users' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'google_id', length: 100 })
  google_id: string;

  @Column('varchar', { name: 'email', length: 100 })
  email: string;

  @Column('varchar', { name: 'picture_url', length: 10000 })
  picture_url: string;

  @Column('varchar', {
    name: 'favorite_indicators',
    length: 4096,
    nullable: true,
  })
  favorite_indicators: string;

  @Column('varchar', { name: 'favorite_stocks', length: 4096, nullable: true })
  favorite_stocks: string;

  @Column('varchar', { name: 'favorite_news', length: 4096, nullable: true })
  favorite_news: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Contexts, (context) => context.user)
  @JoinColumn({ name: 'context_id' })
  contexts: Contexts[];

  @OneToMany(() => Journals, (journal) => journal.user)
  @JoinColumn({ name: 'journal_id' })
  journals: Journals[];
}
