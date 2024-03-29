import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { ECurrency, IAmount } from 'modules/billing/types';
import { useBundlePaymentPlans } from 'domains/account/hooks/useBundlePaymentPlans';

import { IDealAmountProps } from '../DealAmount';

const titleFallbackKey = 'account.payment-form.deal-proposal.title';

export const useDealAmount = (): IDealAmountProps => {
  const { deal500: currentPlan, loading: isLoading } = useBundlePaymentPlans({
    skipFetching: true,
  });

  const title = currentPlan?.bundle.name ?? t(titleFallbackKey);

  const amount = useMemo<IAmount | undefined>(() => {
    if (currentPlan) {
      const { price } = currentPlan;

      return {
        currency: ECurrency.USD,
        id: price.id,
        value: Number(price.amount),
      };
    }

    return undefined;
  }, [currentPlan]);

  return { amount, isLoading, title };
};
