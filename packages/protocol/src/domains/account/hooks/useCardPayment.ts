import { useCallback } from 'react';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { fetchLinkForCardPayment } from 'domains/account/actions/usdTopUp/fetchLinkForCardPayment';

export const useCardPayment = () => {
  const dispatchRequest = useDispatchRequest();

  const handleFetchLinkForCardPayment = useCallback(
    (amount: BigNumber) =>
      dispatchRequest(fetchLinkForCardPayment(amount.toString())),
    [dispatchRequest],
  );

  const { loading: isFetchLinkForCardPaymentLoading } = useQuery({
    type: fetchLinkForCardPayment.toString(),
  });

  return {
    handleFetchLinkForCardPayment,
    isFetchLinkForCardPaymentLoading,
  };
};
