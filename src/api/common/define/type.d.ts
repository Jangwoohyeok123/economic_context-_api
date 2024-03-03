import { Users } from 'src/api/user/entity/user.entity';

export interface UserRequest extends Request {
  user: Users;
}
