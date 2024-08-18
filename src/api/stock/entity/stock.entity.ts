import { CommonEntity } from 'src/api/common/entity/common.entity';
import { Context } from 'src/api/context/entity/context.entity';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'economic_context', name: 'stocks' })
export class Stock extends CommonEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'stock_id' })
  stockId: number;

  @OneToMany(() => Context, (context) => context.stock)
  contexts: Context[];
}
