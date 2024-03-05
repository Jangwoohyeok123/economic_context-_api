import { Contexts } from 'src/api/context/entity/context.entity';
import { Users } from 'src/api/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @ManyToOne(() => Users, (user) => user.journals)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @ManyToOne(() => Contexts, (context) => context.journals)
  @JoinColumn({ name: 'context_id' })
  context: Contexts;
}
