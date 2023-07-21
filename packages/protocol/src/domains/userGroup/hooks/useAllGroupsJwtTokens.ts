import { useAppSelector } from 'store/useAppSelector';

import { selectAllUserGroupsJwtTokens } from '../store';

export const useAllUserGroupsJwtTokens = () => {
  return useAppSelector(selectAllUserGroupsJwtTokens);
};
