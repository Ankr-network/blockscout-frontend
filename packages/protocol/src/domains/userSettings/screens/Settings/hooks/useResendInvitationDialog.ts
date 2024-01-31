import { useCallback } from 'react';
import { Web3Address } from 'multirpc-sdk';
import { useDispatch } from 'react-redux';
import { t } from '@ankr.com/common';

import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { useResendTeamInvitationMutation } from 'domains/userSettings/actions/teams/resendTeamInvitation';
import { isMutationSuccessful } from 'store/utils/isMutationSuccessful';

export const useResendInvitation = (groupAddress: Web3Address) => {
  const [resendTeamInvitation, { isLoading: isLoadingResendTeamInvite }] =
    useResendTeamInvitationMutation();

  const dispatch = useDispatch();

  const handleResendInvitation = useCallback(
    async (email: string) => {
      const response = await resendTeamInvitation({
        email,
        group: groupAddress,
      });

      if (isMutationSuccessful(response) && response.data?.result) {
        dispatch(
          NotificationActions.showNotification({
            message: t('teams.resend-invite.success-message'),
            severity: 'success',
            autoHideDuration: null,
          }),
        );
      }
    },
    [dispatch, groupAddress, resendTeamInvitation],
  );

  return {
    isLoadingResendTeamInvite,
    handleResendInvitation,
  };
};
