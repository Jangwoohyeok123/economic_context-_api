import { CommonEntity } from 'src/api/common/entity/common.entity';
import { User } from 'src/api/user/entity/user.entity';
import { Column, ManyToOne } from 'typeorm';

export class Tag extends CommonEntity {
  @Column('varchar', { name: 'name', length: 100 })
  name: string;

  @ManyToOne(() => User, (user) => user.tags)
  user: User;
}
