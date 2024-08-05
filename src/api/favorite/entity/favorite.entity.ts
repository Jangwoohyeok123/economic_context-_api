import { Users } from 'src/api/user/entity/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

/* 
  @description: favorite을 따로 테이블을 만든 이유는 user table에서 처리할 경우 제1 정규형을 위배하기 때문이다.
*/
@Entity({ schema: 'economic_context', name: 'favorite_news' })
export class FavoriteNews {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.id, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: Users;
}

@Entity({ schema: 'economic_context', name: 'favorite_indicators' })
export class FavoriteIndicator {
  @PrimaryGeneratedColumn()
  id: number;
}
