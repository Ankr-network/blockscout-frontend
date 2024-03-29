import { isValidDomain, t } from '@ankr.com/common';

export const validateDomain = (value?: string) => {
  if (typeof value !== 'string') {
    return t('validation.domain-required');
  }

  if (!isValidDomain(value)) {
    return t('validation.domain-validation');
  }

  return undefined;
};
