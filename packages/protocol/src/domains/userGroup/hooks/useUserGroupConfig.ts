import { useAppSelector } from 'store/useAppSelector';

import { selectUserGroupConfigByAddress } from '../store';

export const useUserGroupConfig = () => {
  return useAppSelector(selectUserGroupConfigByAddress) || {};
};
