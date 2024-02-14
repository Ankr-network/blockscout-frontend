import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { GroupUserRole } from 'multirpc-sdk';

import {
  setUserGroupConfig,
  UserGroupConfigWithAddress,
} from 'domains/userGroup/store';
import { useAuth } from 'domains/auth/hooks/useAuth';

export const useSelectPersonalGroup = () => {
  const { address } = useAuth();
  const dispatch = useDispatch();

  const selectPersonalGroup = useCallback(() => {
    const personalGroupConfig: UserGroupConfigWithAddress = {
      address,
      selectedGroupAddress: address,
      selectedGroupRole: GroupUserRole.owner,
    };

    dispatch(setUserGroupConfig(personalGroupConfig));
  }, [address, dispatch]);

  return {
    selectPersonalGroup,
  };
};
