import { useCallback } from 'react';
import { useDispatchRequest, useQuery } from '@redux-requests/react';

import {
  fetchLinkForCardPayment,
  OneTimePaymentIdType,
} from 'domains/account/actions/usdTopUp/fetchLinkForCardPayment';

export const useCardPayment = () => {
  const dispatchRequest = useDispatchRequest();

  const handleFetchLinkForCardPayment = useCallback(
    (amount: string, id?: string | OneTimePaymentIdType) =>
      dispatchRequest(fetchLinkForCardPayment(amount, id)),
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
