import { useCallback, useState } from 'react';

import { isValidEmail } from 'modules/common/utils/isValidEmail';

import { OnEmailsInputChange } from '../types';
import { isEmailDuplicated } from '../utils/isEmailDuplicated';
import { isEmailAlreadyExist } from '../utils/isEmailAlreadyExist';

export interface UseEmailsCountParams {
  handleChange?: OnEmailsInputChange;
  invitedEmails: string[];
  teamMembersCount: number;
}

export const useEmailsCount = ({
  teamMembersCount,
  invitedEmails,
  handleChange,
}: UseEmailsCountParams) => {
  const [emailsCount, setEmailsCount] = useState(teamMembersCount);
  const [invalidEmailsCount, setInvalidEmailsCount] = useState(0);

  const onChange = useCallback<OnEmailsInputChange>(
    emails => {
      const validEmails = emails.filter(
        (email, index) =>
          isValidEmail(email) &&
          !isEmailDuplicated({ email, emails, index }) &&
          !isEmailAlreadyExist({ email, invitedEmails }),
      );

      setInvalidEmailsCount(emails.length - validEmails.length);
      setEmailsCount(teamMembersCount + validEmails.length);

      handleChange?.(emails);
    },
    [handleChange, invitedEmails, teamMembersCount],
  );

  return { emailsCount, invalidEmailsCount, onChange };
};
