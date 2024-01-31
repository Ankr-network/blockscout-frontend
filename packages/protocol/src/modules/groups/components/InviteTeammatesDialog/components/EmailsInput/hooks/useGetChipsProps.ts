import { ChipsTextFieldProps } from '@ankr.com/ui';
import { useCallback } from 'react';

import { isValidEmail } from 'modules/common/utils/isValidEmail';

import { isEmailDuplicated } from '../utils/isEmailDuplicated';
import { isEmailAlreadyExist } from '../utils/isEmailAlreadyExist';

type GetChipsProps = NonNullable<ChipsTextFieldProps<string>['getChipProps']>;

export interface IUseGetChipsProps {
  invitedEmails: string[];
}

export const useGetChipsProps = ({
  invitedEmails,
}: IUseGetChipsProps): GetChipsProps => {
  const getChipProps = useCallback<GetChipsProps>(
    (email, index, emails) => {
      const isValid = isValidEmail(email);

      const isDuplicate = isEmailDuplicated({ email, emails, index });

      const isAlredyExist = isEmailAlreadyExist({ email, invitedEmails });

      if (!isValid || isDuplicate || isAlredyExist) {
        return { color: 'error' };
      }

      return undefined;
    },
    [invitedEmails],
  );

  return getChipProps;
};
