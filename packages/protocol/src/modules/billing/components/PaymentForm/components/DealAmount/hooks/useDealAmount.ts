import { t } from '@ankr.com/common';
import { useEffect, useMemo } from 'react';

import { ECurrency, IAmount } from 'modules/billing/types';
import { useBundlePaymentPlans } from 'domains/account/hooks/useBundlePaymentPlans';
import { useLazyFetchBundlePaymentPlansQuery } from 'domains/account/actions/bundles/fetchBundlePaymentPlans';

import { IDealAmountProps } from '../DealAmount';

const titleFallbackKey = 'account.payment-form.deal-proposal.title';

export const useDealAmount = (): IDealAmountProps => {
  const { deal500: deal500Plan, loading: isLoading } = useBundlePaymentPlans({
    skipFetching: true,
  });

  const [fetchBundles] = useLazyFetchBundlePaymentPlansQuery();

  useEffect(() => {
    if (!isLoading && !deal500Plan) {
      fetchBundles();
    }
  }, [deal500Plan, isLoading, fetchBundles]);

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

  return { amount, isLoading, title };
};
