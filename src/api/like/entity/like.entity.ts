import { CommonEntity } from 'src/api/common/entity/common.entity';
import { Context } from 'src/api/context/entity/context.entity';
import { User } from 'src/api/user/entity/user.entity';
import { Entity, ManyToOne, PrimaryColumn, Unique } from 'typeorm';

@Entity({ schema: 'economic_context', name: 'likes' })
@Unique(['userId', 'contextId'])
export class Like extends CommonEntity {
  @PrimaryColumn('int', { name: 'user_id' })
  userId: number;

  @PrimaryColumn('int', { name: 'context_id' })
  contextId: number;

  @ManyToOne(() => User, (user) => user.likes)
  user: User;

  @ManyToOne(() => Context, (context) => context.likes)
  context: Context;
}
// 하나의 user는 여러개의 like를 가진다.
// 하나의 context는 여러개의 like를 가진다.
// 하나의 like는 하나의 user를 가진다.
// 하나의 like는 하나의 context를 가진다.
