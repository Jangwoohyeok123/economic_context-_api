import { CommonEntity } from 'src/api/common/entity/common.entity';
import { Tag } from 'src/api/tag/entity/tag.entity';
import { Column, Entity, OneToMany } from 'typeorm';

/* 
  @description
  1. fav_indiator
  2. fav_news
  3. context 
*/
@Entity({ schema: 'economic_context', name: 'users' })
export class User extends CommonEntity {
  @Column('varchar', { name: 'google_id', length: 100 })
  google_id: string;

  @Column('varchar', { name: 'email', length: 100 })
  email: string;

  @Column('varchar', { name: 'picture_url', length: 3000 })
  picture_url: string;

  @OneToMany(() => Tag, (tag) => tag.user)
  tags: Tag[];
}
