import { useCallback } from 'react';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { fetchLinkForCardPayment } from 'domains/account/actions/usdTopUp/fetchLinkForCardPayment';
import { canPayByCard } from 'domains/account/actions/usdTopUp/canPayByCard';

export const useCardPayment = () => {
  const dispatchRequest = useDispatchRequest();

  const handleFetchLinkForCardPayment = useCallback(
    (amount: BigNumber) =>
      dispatchRequest(fetchLinkForCardPayment(amount.toString())),
    [dispatchRequest],
  );

  const handleCanPayByCard = useCallback(
    () => dispatchRequest(canPayByCard()),
    [dispatchRequest],
  );

  const { loading: isFetchLinkForCardPaymentLoading } = useQuery({
    type: fetchLinkForCardPayment.toString(),
  });

  const { data: isCardPaymentEligible, loading: isCanPayByCardLoading } =
    useQuery({
      type: canPayByCard.toString(),
    });

  return {
    handleFetchLinkForCardPayment,
    handleCanPayByCard,
    isFetchLinkForCardPaymentLoading,
    isCanPayByCardLoading,
    isCardPaymentEligible,
  };
};
