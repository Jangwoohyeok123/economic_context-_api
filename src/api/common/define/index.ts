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

export type FredAPIData = {
  id: string;
  title: string;
  notes?: string;
  observation_start?: string;
  observation_end?: string;
  frequency?: string;
  frequency_short?: string;
  group_popularity?: number;
  popularity?: number;
  last_updated?: string;
  realtime_start?: string;
  realtime_end?: string;
  seasonal_adjustment?: string;
  seasonal_adjustment_short?: string;
  units?: string;
  units_short?: string;
};
