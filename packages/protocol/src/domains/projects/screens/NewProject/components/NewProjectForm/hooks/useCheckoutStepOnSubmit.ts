import { useCallback } from 'react';

import { useCardPayment } from 'domains/account/hooks/useCardPayment';
import { USDPaymentReason } from 'domains/projects/const';

export const useCheckoutStepOnSubmit = () => {
  const { handleFetchLinkForCardPayment } = useCardPayment();

  return useCallback(
    async (planPrice: string) => {
      const { data: url } = await handleFetchLinkForCardPayment(
        planPrice,
        USDPaymentReason.Whitelist,
      );

      return url;
    },
    [handleFetchLinkForCardPayment],
  );
};
