import { useCallback } from 'react';

import {
  OneTimePaymentIdType,
  useLazyUsdTopUpFetchLinkForCardPaymentQuery,
} from 'domains/account/actions/usdTopUp/fetchLinkForCardPayment';

export const useCardPayment = () => {
  const [
    fetchLinkForCardPayment,
    { isLoading: isFetchLinkForCardPaymentLoading },
  ] = useLazyUsdTopUpFetchLinkForCardPaymentQuery();

  const handleFetchLinkForCardPayment = useCallback(
    (amount: string, id?: string | OneTimePaymentIdType) =>
      fetchLinkForCardPayment({ amount, id }),
    [fetchLinkForCardPayment],
  );

  return {
    handleFetchLinkForCardPayment,
    isFetchLinkForCardPaymentLoading,
  };
};
