import { CommonEntity } from 'src/api/common/entity/common.entity';
import { User } from 'src/api/user/entity/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

/* 
  @description: favorite을 따로 테이블을 만든 이유는 user table에서 처리할 경우 제1 정규형을 위배하기 때문이다.
*/
@Entity({ schema: 'economic_context', name: 'favorite_news' })
export class FavoriteNews extends CommonEntity {
  @PrimaryColumn()
  favoriteNewsId: number;

  @ManyToOne(() => User, (user) => user.favoriteNews)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}

@Entity({ schema: 'economic_context', name: 'favorite_indicators' })
export class FavoriteIndicator extends CommonEntity {
  @ManyToOne(() => User, (user) => user.favoriteIndicators)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
