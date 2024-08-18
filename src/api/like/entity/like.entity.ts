import { CommonEntity } from 'src/api/common/entity/common.entity';
import { Context } from 'src/api/context/entity/context.entity';
import { User } from 'src/api/user/entity/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn, Unique } from 'typeorm';

@Entity({ schema: 'economic_context', name: 'likes' })
@Unique(['userId', 'contextId'])
export class Like extends CommonEntity {
  @PrimaryColumn('int', { name: 'user_id' })
  userId: number;

  @PrimaryColumn('int', { name: 'context_id' })
  contextId: number;

  @ManyToOne(() => User, (user) => user.likes)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Context, (context) => context.likes)
  @JoinColumn({ name: 'context_id' })
  context: Context;
}
