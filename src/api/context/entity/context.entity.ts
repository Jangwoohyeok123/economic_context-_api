import { Indicators } from 'src/api/indicator/entity/indicator.entity';
import { Journals } from 'src/api/journal/entity/journal.entity';
import { Users } from 'src/api/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'economic_context', name: 'contexts' })
export class Context {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 100 })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Users, (user) => user.contexts)
  user: Users;

  @OneToMany(() => Journals, (journal) => journal.context)
  journals: Journals[];

  @ManyToMany(() => Indicators, (indicator) => indicator.contexts)
  indicators: Indicators[];
}
