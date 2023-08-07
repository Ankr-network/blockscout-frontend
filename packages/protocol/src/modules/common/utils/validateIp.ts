import { t } from '@ankr.com/common';

import { isIpAddress } from './isIpAddress';

export const validateIp = (value?: string) => {
  if (typeof value !== 'string') {
    return t('validation.required');
  }

  if (!isIpAddress(value)) {
    return t('validation.ip-validation');
  }

  return undefined;
};
