import { isValidDomain, t } from '@ankr.com/common';

import { DomainsFormData, DomainsFormProps } from './DomainsFormTypes';

export const validateDomain = (value?: string) => {
  if (typeof value !== 'string') {
    return t('validation.required');
  }

  if (!isValidDomain(value)) {
    return t('validation.domain-validation');
  }

  return undefined;
};

export const getInitialValues = (
  domains: DomainsFormProps['data'],
): DomainsFormData => {
  return {
    domains,
  };
};
