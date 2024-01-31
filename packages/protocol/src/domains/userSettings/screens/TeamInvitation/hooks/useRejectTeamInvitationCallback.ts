import { useCallback } from 'react';

import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';
import { isMutationSuccessful } from 'store/utils/isMutationSuccessful';
import { useRejectTeamInvitationMutation } from 'domains/userSettings/actions/teams/rejectTeamInvitation';

export interface UseRejectTeamInvitationCallbackParams {
  onSuccess?: () => void;
}

export const useRejectTeamInvitationCallback = ({
  onSuccess,
}: UseRejectTeamInvitationCallbackParams | void = {}) => {
  const { group, token } = UserSettingsRoutesConfig.teamInvitation.useQuery();

  const [reject, { isLoading: isRejecting }] =
    useRejectTeamInvitationMutation();

  const handleRejectTeamInvitation = useCallback(async () => {
    const result = await reject({ group, token });

    if (onSuccess && isMutationSuccessful(result)) {
      onSuccess();
    }
  }, [group, onSuccess, reject, token]);

  return { handleRejectTeamInvitation, isRejecting };
};
