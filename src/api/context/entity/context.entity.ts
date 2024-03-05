import { Journals } from 'src/api/journal/entity/journal.entity';
import { Users } from 'src/api/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'economic_context', name: 'users' })
export class Contexts {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 100 })
  name: string;

  @Column('varchar', {
    name: 'custom_indicators',
    length: 4096,
    nullable: true,
  })
  custom_indicators: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Users, (user) => user.contexts)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @OneToMany(() => Journals, (journal) => journal.context)
  journals: Journals[];
}
