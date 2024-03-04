import { Users } from 'src/api/user/entity/user.entity';

export interface UserRequest extends Request {
  user: Users;
}

export enum IndicatorCategory {
  Interest = 114,
  Exchange = 94,
  Consume = 9,
  Production = 31,
}
