import { useCallback } from 'react';

import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';
import { isMutationSuccessful } from 'modules/common/utils/isMutationSuccessful';
import { useAcceptTeamInvitationMutation } from 'domains/userSettings/actions/teams/acceptTeamInvitation';

import { useAcceptTeamInvitationSuccessHandler } from './useAcceptTeamInvitationSuccessHandler';

export interface UseAcceptTeamInvitationCallbackParams {
  handleTeamInvitationDialogClose: () => void;
}

export const useAcceptTeamInvitationCallback = ({
  handleTeamInvitationDialogClose,
}: UseAcceptTeamInvitationCallbackParams) => {
  const { group, token } = UserSettingsRoutesConfig.teamInvitation.useQuery();

  const [acceptTeamInvitation, { isLoading: isTeamInvitationAccepting }] =
    useAcceptTeamInvitationMutation();

  const { onSuccess } = useAcceptTeamInvitationSuccessHandler({
    handleTeamInvitationDialogClose,
  });

  const handleAcceptTeamInvitation = useCallback(async () => {
    const result = await acceptTeamInvitation({ group, token });

    if (isMutationSuccessful(result)) {
      onSuccess();
    }
  }, [acceptTeamInvitation, group, onSuccess, token]);

  return { handleAcceptTeamInvitation, isTeamInvitationAccepting };
};
