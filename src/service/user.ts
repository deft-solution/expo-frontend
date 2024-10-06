import { UserLiveProfileMe } from '@/schema/Wonderpass/User';
import { GET } from '../core/services/index';
import { getWonderPassToken } from '@/helper';

export const getLiveCurrentProfile = (): Promise<UserLiveProfileMe> => {
  const API_URL = '/wonderpass-api/v1/users/me';
  const token = getWonderPassToken();
  const header = { Authorization: token };
  return GET<UserLiveProfileMe>(API_URL, {}, header);
};
