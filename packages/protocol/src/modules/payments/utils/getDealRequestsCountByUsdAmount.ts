import { CREDITS_TO_REQUESTS_RATE } from 'domains/account/store/const';

import { getRequestsByUSDAmount } from './getRequestsByUSDAmount';
import { DEAL_PROMO_EXTRA_REQUESTS_RATE } from '../components/PaymentForm/components/AmountInput/const';

export const getDealRequestsCountByUsdAmount = (amount?: number) => {
  const currentBundleRequestsCount = getRequestsByUSDAmount(
    amount || 0,
    DEAL_PROMO_EXTRA_REQUESTS_RATE,
  );

  const currentBundleApiCreditsCount =
    currentBundleRequestsCount * CREDITS_TO_REQUESTS_RATE;

  return currentBundleApiCreditsCount;
};
