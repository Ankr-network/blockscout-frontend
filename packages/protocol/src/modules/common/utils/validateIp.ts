import { t } from '@ankr.com/common';
import ipRegex from 'ip-regex';

import { isIpAddress } from './isIpAddress';

export const validateIp = (value?: string) => {
  if (typeof value !== 'string') {
    return t('validation.required');
  }

  if (!isIpAddress(value) && !ipRegex.v6({ exact: true }).test(value)) {
    return t('validation.ip-validation');
  }

  return undefined;
};
