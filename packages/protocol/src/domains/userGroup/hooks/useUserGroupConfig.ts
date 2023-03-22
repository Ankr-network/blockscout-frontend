import { useAppSelector } from 'store/useAppSelector';
import { selectUserGroupConfigByAddress } from '../store/userGroupSlice';

export const useUserGroupConfig = () => {
  return useAppSelector(selectUserGroupConfigByAddress) ?? {};
};
