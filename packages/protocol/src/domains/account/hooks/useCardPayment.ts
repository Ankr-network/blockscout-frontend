import { useCallback } from 'react';

import {
  OneTimePaymentIdType,
  useLazyUsdTopUpFetchLinkForCardPaymentQuery,
} from 'domains/account/actions/usdTopUp/fetchLinkForCardPayment';
import { Web3Address } from 'multirpc-sdk';

export const useCardPayment = () => {
  const [
    fetchLinkForCardPayment,
    { isLoading: isFetchLinkForCardPaymentLoading },
  ] = useLazyUsdTopUpFetchLinkForCardPaymentQuery();

  const handleFetchLinkForCardPayment = useCallback(
    ({
      amount,
      id,
      groupAddress,
    }: {
      amount: string;
      id?: string | OneTimePaymentIdType;
      groupAddress?: Web3Address;
    }) => fetchLinkForCardPayment({ amount, id, groupAddress }),
    [fetchLinkForCardPayment],
  );

  return {
    handleFetchLinkForCardPayment,
    isFetchLinkForCardPaymentLoading,
  };
};
