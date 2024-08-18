import { CommonEntity } from 'src/api/common/entity/common.entity';
import { Journal } from 'src/api/journal/entity/journal.entity';
import { Like } from 'src/api/like/entity/like.entity';
import { Stock } from 'src/api/stock/entity/stock.entity';
import { Tag } from 'src/api/tag/entity/tag.entity';
import { User } from 'src/api/user/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ schema: 'economic_context', name: 'contexts' })
export class Context extends CommonEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'context_id' })
  contextId: number;

  @Column('varchar', { name: 'name', length: 100 })
  name: string;

  @Column('varchar', { name: 'description', length: 100, nullable: true })
  description: string;

  @ManyToMany(() => Tag, (tag) => tag.contexts)
  tags: Tag[];

  @OneToMany(() => Journal, (journal) => journal.context)
  journals: Journal[];

  @OneToMany(() => Like, (like) => like.context)
  likes: Like[];

  @ManyToOne(() => Stock, (stock) => stock.contexts)
  @JoinColumn({ name: 'stock_id', referencedColumnName: 'stockId' })
  stock: Stock;

  @ManyToOne(() => User, (user) => user.contexts)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  user: User;
}
