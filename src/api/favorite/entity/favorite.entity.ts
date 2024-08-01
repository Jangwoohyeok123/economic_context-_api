import { Entity, PrimaryGeneratedColumn } from 'typeorm';

/* 
  @description: favorite을 따로 테이블을 만든 이유는 user table에서 처리할 경우 제1 정규형을 위배하기 때문이다.
*/
@Entity({ schema: 'economic_context', name: 'favorite_news' })
export class News {
  @PrimaryGeneratedColumn()
  id: number;
}

@Entity({ schema: 'economic_context', name: 'favorite_stocks' })
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;
}

@Entity({ schema: 'economic_context', name: 'favorite_indicators' })
export class Indicator {
  @PrimaryGeneratedColumn()
  id: number;
}
