import { Contexts } from 'src/api/context/entity/context.entity';
import { Journals } from 'src/api/journal/entity/journal.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
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

  @Column('varchar', { name: 'picture_url', length: 300 })
  picture_url: string;

  @Column('varchar', {
    name: 'favorite_indicators',
    length: 4096,
    nullable: true,
  })
  favorite_indicators: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Contexts, (context) => context.user)
  contexts: Contexts[];

  @OneToMany(() => Journals, (journal) => journal.user)
  journals: Journals[];
}
