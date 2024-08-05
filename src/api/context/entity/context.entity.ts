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

/*  
  db는 snake case, nest는 camel case를 사용한다.
*/
@Entity({ schema: 'economic_context', name: 'contexts' })
export class Contexts {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 100 })
  name: string;

  @Column('varchar', { name: 'name', length: 1024 })
  label: string;

  // @Column('varchar', {
  //   name: 'customIndicators',
  //   length: 4096,
  //   nullable: true,
  // })
  // customIndicators: string;

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
