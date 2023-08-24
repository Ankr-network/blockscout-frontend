import { t } from '@ankr.com/common';

import { isAscii } from './isAscii';

export const validateAscii = (value?: string) => {
  if (!value) {
    return undefined;
  }

  if (!isAscii(value)) {
    return t('validation.ascii-validation');
  }

  return undefined;
};
