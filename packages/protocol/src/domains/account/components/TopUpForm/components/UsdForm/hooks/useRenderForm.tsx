import { FormRenderProps } from 'react-final-form';
import { useCallback } from 'react';

import { DEFAULT_USD_VALUE_STRING } from 'domains/account/actions/usdTopUp/const';
import { ONE_TIME_PAYMENT_ID } from 'domains/account/actions/usdTopUp/fetchLinkForOneTimePayment';
import { useBundlePaymentPlans } from 'domains/account/hooks/useBundlePaymentPlans';

import { FormField } from '../constants';
import { FormValues, OnChange } from '../types';
import { NativeForm } from '../components/NativeForm';
import { checkBundleByPriceId } from '../utils/checkBundleByPriceId';
import { validateAmount } from '../utils/validateAmount';

export interface RenderFormParams {
  shouldUseDefaultValue: boolean;
  onBundleBannerClick: () => void;
}

export const useRenderForm = ({
  shouldUseDefaultValue,
  onBundleBannerClick,
}: RenderFormParams) => {
  const { bundles } = useBundlePaymentPlans({ skipFetching: true });

  return useCallback(
    ({
      handleSubmit,
      validating,
      values: { amount, priceId },
      form: { change },
    }: FormRenderProps<FormValues>) => {
      const canEditAmount = priceId === ONE_TIME_PAYMENT_ID;

      const isBundlePayment = checkBundleByPriceId(priceId, bundles);
      const handleAmountChange: OnChange = (id, value) => {
        const processedAmount =
          shouldUseDefaultValue && !value ? DEFAULT_USD_VALUE_STRING : value;

        change(FormField.Amount, processedAmount);
        change(FormField.PriceId, id);
      };

      return (
        <NativeForm
          amount={amount}
          canEditAmount={canEditAmount}
          handleAmountChange={handleAmountChange}
          handleSubmit={handleSubmit}
          isBundlePayment={isBundlePayment}
          isValidating={validating}
          validateAmount={validateAmount}
          onBundleBannerClick={onBundleBannerClick}
          change={change}
          handleOpenBundleDialog={() => {}}
          initialPriceId={priceId}
          isLoading={false}
        />
      );
    },
    [bundles, onBundleBannerClick, shouldUseDefaultValue],
  );
};
