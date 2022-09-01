import BigNumber from 'bignumber.js';
import { useCallback } from 'react';

import { useCardPayment } from 'domains/account/hooks/useCardPayment';
import { USDTopUpForm } from './USDTopUpForm';
import { TopUpFormValues } from './USDTopUpFormTypes';
import { useAuth } from 'domains/auth/hooks/useAuth';

export const USDTopUpFormContainer = () => {
  const { handleFetchLinkForCardPayment, isFetchLinkForCardPaymentLoading } =
    useCardPayment();
  const { credentials } = useAuth();

  const onSubmit = useCallback(
    async (data: TopUpFormValues) => {
      const { data: url } = await handleFetchLinkForCardPayment(
        new BigNumber(data.amount),
      );

      if (url) {
        window.location.href = url;
      }
    },
    [handleFetchLinkForCardPayment],
  );

  return (
    <USDTopUpForm
      onSubmit={onSubmit}
      isLoading={isFetchLinkForCardPaymentLoading}
      isDisabled={!credentials}
    />
  );
};
