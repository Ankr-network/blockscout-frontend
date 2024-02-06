import { Web3Address } from 'multirpc-sdk';
import { useCallback } from 'react';

import { useLeaveTeamMutation } from 'domains/userSettings/actions/teams/leaveTeam';
import { useSelectPersonalGroup } from 'modules/groups/hooks/useSelectPersonalGroup';

export interface IUseLeaveTeamHandler {
  group?: Web3Address;
  onSuccess?: () => void;
}

export const useLeaveTeamHandler = ({
  group,
  onSuccess,
}: IUseLeaveTeamHandler) => {
  const [leaveTeam, { isLoading: isLeaving }] = useLeaveTeamMutation();

  const { selectPersonalGroup } = useSelectPersonalGroup();

  const handleLeaveTeam = useCallback(async () => {
    await leaveTeam({ group });

    selectPersonalGroup();

    onSuccess?.();
  }, [group, leaveTeam, onSuccess, selectPersonalGroup]);

  return { handleLeaveTeam, isLeaving };
};
