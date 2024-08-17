import { CommonEntity } from 'src/api/common/entity/common.entity';
import { Context } from 'src/api/context/entity/context.entity';
import { User } from 'src/api/user/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
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

  // user는 tags속성을 typeorm에서 갖고 db는 column이 없는게 맞다.
  @ManyToOne(() => User, (user) => user.tags)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  user: User;

  @ManyToMany(() => Context, (context) => context.tags)
  contexts: Context[];
}
// @JoinColumn은 fk의 column명을 지정하고 typeorm상 참조할 컬럼명을 지정한다.
