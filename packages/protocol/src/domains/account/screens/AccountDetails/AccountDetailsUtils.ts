import BigNumber from 'bignumber.js';
import { MIN_ANKR_AMOUNT } from 'domains/pricing/screens/Pricing/components/PremiumBlock/PricingTopUp/PricingTopUpUtils';
import { t } from 'modules/i18n/utils/intl';

export const validateAmount = (value: string) => {
  if (!value) {
    return t('validation.required');
  }

  const currentAmount = new BigNumber(value);

  if (currentAmount.isNaN()) {
    return t('validation.number-only');
  }

  if (currentAmount.isLessThan(MIN_ANKR_AMOUNT)) {
    return t('plan.premium-block.min', {
      value: MIN_ANKR_AMOUNT.toFormat(),
    });
  }

  return undefined;
};
