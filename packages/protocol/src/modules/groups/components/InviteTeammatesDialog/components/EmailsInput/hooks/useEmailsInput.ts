import { useChipsTextField } from '@ankr.com/ui';
import { useMemo } from 'react';

import { isValidEmail } from 'modules/common/utils/isValidEmail';

import { OnEmailsInputChange } from '../types';
import { isEmailDuplicated } from '../utils/isEmailDuplicated';
import { isEmailAlreadyExist } from '../utils/isEmailAlreadyExist';

export interface UseEmailsInputParams {
  initialValue?: string[];
  invitedEmails: string[];
  onChange?: OnEmailsInputChange;
}

const defaultInitialValue: string[] = [];

export const useEmailsInput = ({
  initialValue = defaultInitialValue,
  invitedEmails,
  onChange: handleChange,
}: UseEmailsInputParams) => {
  const { onChange, value = [] } = useChipsTextField({
    onChange: handleChange,
    value: initialValue,
  });

  const emails = useMemo(
    () =>
      value.filter(
        (email, index) =>
          isValidEmail(email) &&
          !isEmailDuplicated({ email, emails: value, index }) &&
          !isEmailAlreadyExist({ email, invitedEmails }),
      ),
    [invitedEmails, value],
  );

  return { emails, onChange, value };
};
