import { CommonEntity } from 'src/api/common/entity/common.entity';
import { Context } from 'src/api/context/entity/context.entity';
import {
  FavoriteIndicator,
  FavoriteNews,
  FavoriteStock,
} from 'src/api/favorite/entity/favorite.entity';
import { Like } from 'src/api/like/entity/like.entity';
import { Tag } from 'src/api/tag/entity/tag.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'economic_context', name: 'users' })
export class User extends CommonEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'user_id' })
  userId: number;

  @Column('varchar', { name: 'google_id', length: 100 })
  googleId: string;

  @Column('varchar', { name: 'email', length: 100 })
  email: string;

  @Column('varchar', { name: 'picture_url', length: 3000 })
  pictureUrl: string;

  @OneToMany(() => Tag, (tag) => tag.user)
  tags: Tag[];

  @OneToMany(
    () => FavoriteIndicator,
    (favoriteIndicators) => favoriteIndicators.user,
  )
  favoriteIndicators: FavoriteIndicator[];

  @OneToMany(() => FavoriteNews, (favoriteNews) => favoriteNews.user)
  favoriteNews: FavoriteNews[];

  @OneToMany(() => FavoriteStock, (favoriteStock) => favoriteStock.user)
  favoriteStocks: FavoriteStock[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @OneToMany(() => Context, (context) => context.user)
  contexts: Context[];
}
