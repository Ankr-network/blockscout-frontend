import { t } from '@ankr.com/common';
import isValidDomain from 'is-valid-domain';

export const validateDomain = (value: string) => {
  if (typeof value !== 'string') {
    return t('validation.required');
  }

  if (!isValidDomain(value)) {
    return t('validation.domain-validation');
  }

  return undefined;
};
