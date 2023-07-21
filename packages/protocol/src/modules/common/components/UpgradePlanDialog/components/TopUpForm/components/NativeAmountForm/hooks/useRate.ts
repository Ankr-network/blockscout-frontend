import { useOnMount } from 'modules/common/hooks/useOnMount';
import { useRates } from 'domains/account/hooks/useRates';

import { RateProps } from '../../Rate';
import { TopUpCurrency } from '../../../types';
import { getAmountInCredits } from '../utils/getAmountInCredits';

export interface RateParams {
  amount: string;
  currency: TopUpCurrency;
}

export const useRate = ({
  amount: rawAmount,
  currency,
}: RateParams): RateProps => {
  const { handleFetchRates, isRateLoading, rates } = useRates();

  useOnMount(() => {
    handleFetchRates();
  });

  const amount = Number(rawAmount) ? rawAmount : '1';

  const credits = getAmountInCredits({ amount, currency, rates });

  return { amount, currency, credits, isRateLoading };
};
