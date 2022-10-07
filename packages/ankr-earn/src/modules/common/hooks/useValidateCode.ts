import { ReactText } from 'react';

import { t } from 'common';

export type TUseValidateCode = (value?: ReactText) => string | undefined;

export const useValidateCode = (): TUseValidateCode => (value?: ReactText) => {
  if (!value) {
    return t('validation.required');
  }

  return undefined;
};
