import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export class CommonEntity {
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
