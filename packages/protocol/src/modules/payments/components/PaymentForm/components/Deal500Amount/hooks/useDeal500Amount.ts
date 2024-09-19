import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { ECurrency, IAmount } from 'modules/payments/types';
import { useAppSelector } from 'store/useAppSelector';
import {
  selectBundlePaymentPlansInitLoading,
  selectDeal500BundlePaymentPlan,
} from 'domains/account/store/selectors';

import { IDeal500AmountProps } from '../Deal500Amount';

const titleFallbackKey = 'account.payment-form.deal-proposal.title';

export const useDeal500Amount = (): IDeal500AmountProps => {
  const deal500Plan = useAppSelector(selectDeal500BundlePaymentPlan);
  const isLoadingInitially = useAppSelector(
    selectBundlePaymentPlansInitLoading,
  );

  const title = deal500Plan?.bundle.name || t(titleFallbackKey);

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
