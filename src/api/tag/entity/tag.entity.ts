import { CommonEntity } from 'src/api/common/entity/common.entity';
import { Context } from 'src/api/context/entity/context.entity';
import { User } from 'src/api/user/entity/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ schema: 'economic_context', name: 'tags' })
export class Tag extends CommonEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'tag_id' })
  tagId: number;

  @Column('varchar', { name: 'name', length: 100 })
  name: string;

  @ManyToOne(() => User, (user) => user.tags)
  user: User;

  @ManyToMany(() => Context, (context) => context.tags)
  contexts: Context[];
}
