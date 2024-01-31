import { GroupUserRole, Web3Address } from 'multirpc-sdk';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import {
  UserGroupConfigWithAddress,
  setUserGroupConfig,
} from 'domains/userGroup/store';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useLeaveTeamMutation } from 'domains/userSettings/actions/teams/leaveTeam';

export interface IUseLeaveTeamHandler {
  group?: Web3Address;
  onSuccess?: () => void;
}

export const useLeaveTeamHandler = ({
  group,
  onSuccess,
}: IUseLeaveTeamHandler) => {
  const [leaveTeam, { isLoading: isLeaving }] = useLeaveTeamMutation();

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

  const handleLeaveTeam = useCallback(async () => {
    await leaveTeam({ group });

    selectPersonalGroup();

    onSuccess?.();
  }, [group, leaveTeam, onSuccess, selectPersonalGroup]);

  return { handleLeaveTeam, isLeaving };
};
