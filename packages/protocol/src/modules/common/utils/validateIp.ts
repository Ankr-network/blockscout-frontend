import { t } from '@ankr.com/common';

import { isIpAddress } from './isIpAddress';
import { isIpv6Address } from './isIpv6Address';

export const validateIp = (value?: string) => {
  if (typeof value !== 'string') {
    return t('validation.required');
  }

  if (!isIpAddress(value) && !isIpv6Address(value)) {
    return t('validation.ip-validation');
  }

  return undefined;
};
