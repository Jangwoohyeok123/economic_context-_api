import { CommonEntity } from 'src/api/common/entity/common.entity';
import { Journal } from 'src/api/journal/entity/journal.entity';
import { Like } from 'src/api/like/entity/like.entity';
import { Tag } from 'src/api/tag/entity/tag.entity';
import {
  Column,
  Entity,
  ManyToMany,
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
}
