import isValidDomain from 'is-valid-domain';

import { DomainsFormData, DomainsFormProps } from './DomainsFormTypes';
import { t } from 'modules/i18n/utils/intl';

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
