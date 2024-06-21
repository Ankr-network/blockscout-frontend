import { t } from '@ankr.com/common';

import { ECurrency } from '../types';
import { currencyLabelsMap } from '../const';

export const renderCurrencyLabel = (currency: ECurrency) =>
  t(currencyLabelsMap[currency]);
