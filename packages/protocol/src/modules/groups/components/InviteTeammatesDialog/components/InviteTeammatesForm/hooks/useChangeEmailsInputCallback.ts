import { t } from '@ankr.com/common';
import { useCallback } from 'react';

import { isValidEmail } from 'modules/common/utils/isValidEmail';

import { OnEmailsInputChange } from '../../EmailsInput/types';

export interface UseChangeEmailsInputCallback {
  resetErrorMessage: () => void;
  setErrorMessage: (message: string) => void;
  teamMembersCount: number;
  teamMembersLimit: number;
}

const fullEmailsListErrorMessageKey =
  'teams.invite-teammates-dialog.error-message-full-emails-list';

export const useChangeEmailsInputCallback = ({
  resetErrorMessage,
  setErrorMessage,
  teamMembersCount,
  teamMembersLimit,
}: UseChangeEmailsInputCallback) => {
  const currentLimit = teamMembersLimit - teamMembersCount;

  const onChange = useCallback<OnEmailsInputChange>(
    emails => {
      const validEmails = emails.filter(isValidEmail);
      const hasLimitReached = currentLimit - validEmails.length <= 0;

      if (hasLimitReached) {
        setErrorMessage(t(fullEmailsListErrorMessageKey));
      } else {
        resetErrorMessage();
      }
    },
    [currentLimit, resetErrorMessage, setErrorMessage],
  );

  return onChange;
};
