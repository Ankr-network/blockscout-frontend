import { t } from '@ankr.com/common';
import { ReactText } from 'react';

export type TUseValidateCode = (value?: ReactText) => string | undefined;

export const useValidateCode = (): TUseValidateCode => (value?: ReactText) => {
  if (!value) {
    return t('validation.required');
  }

  return undefined;
};
