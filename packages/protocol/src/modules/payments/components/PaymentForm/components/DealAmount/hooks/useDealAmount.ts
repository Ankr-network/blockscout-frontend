import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { ECurrency, IAmount } from 'modules/payments/types';
import { useBundlePaymentPlans } from 'domains/account/hooks/useBundlePaymentPlans';

import { IDealAmountProps } from '../DealAmount';

const titleFallbackKey = 'account.payment-form.deal-proposal.title';

export const useDealAmount = (): IDealAmountProps => {
  const { deal500: deal500Plan, isLoadingInitially } = useBundlePaymentPlans({
    skipFetching: true,
  });

  const title = deal500Plan?.bundle.name ?? t(titleFallbackKey);

  const amount = useMemo<IAmount | undefined>(() => {
    if (deal500Plan) {
      const { price } = deal500Plan;

      return {
        currency: ECurrency.USD,
        id: price.id,
        value: Number(price.amount),
      };
    }

    return undefined;
  }, [deal500Plan]);

  return { amount, isLoading: isLoadingInitially, title };
};
