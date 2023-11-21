import { t } from '@ankr.com/common';

import { root } from '../../../const';

export const text = (key: string, params?: Record<string, unknown>) =>
  t(`${root}.endpoints.${key}`, params);
