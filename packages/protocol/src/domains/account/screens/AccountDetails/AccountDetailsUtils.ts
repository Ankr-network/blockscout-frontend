import BigNumber from 'bignumber.js';

import { DEFAULT_ANKR_VALUE } from 'domains/account/actions/topUp/const';
import { t } from 'modules/i18n/utils/intl';

export const validateAmount = (value: string) => {
  if (!value) {
    return t('validation.required');
  }

  const currentAmount = new BigNumber(value);

  if (currentAmount.isNaN()) {
    return t('validation.number-only');
  }

  if (currentAmount.isLessThan(DEFAULT_ANKR_VALUE)) {
    return t('plan.premium-block.min', {
      value: DEFAULT_ANKR_VALUE.toFormat(),
    });
  }

  return undefined;
};
