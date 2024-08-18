import { CommonEntity } from 'src/api/common/entity/common.entity';
import { User } from 'src/api/user/entity/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

/* 
  @description: favorite을 따로 테이블을 만든 이유는 user table에서 처리할 경우 제1 정규형을 위배하기 때문이다.
*/
@Entity({ schema: 'economic_context', name: 'favorite_news' })
export class FavoriteNews extends CommonEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'favorite_news_id' })
  favoriteNewsId: number;

  @ManyToOne(() => User, (user) => user.favoriteNews)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  user: User;
}

@Entity({ schema: 'economic_context', name: 'favorite_indicators' })
export class FavoriteIndicator extends CommonEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'favorite_indicator_id' })
  favoriteIndicatorId: number;

  @ManyToOne(() => User, (user) => user.favoriteIndicators)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  user: User;
}

@Entity({ schema: 'economic_context', name: 'favorite_stocks' })
export class FavoriteStock extends CommonEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'favorite_stock_id' })
  favoriteStockId: number;

  @ManyToOne(() => User, (user) => user.favoriteStocks)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  user: User;
}
