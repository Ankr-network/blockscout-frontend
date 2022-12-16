import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { fetchAccountBalance } from 'domains/account/actions/balance/fetchAccountBalance';
import { useOnMount } from 'modules/common/hooks/useOnMount';

export const useAnkrBalanceOnWallet = () => {
  const dispatchRequest = useDispatchRequest();

  const {
    data,
    loading: isLoading,
    pristine,
  } = useQuery({
    type: fetchAccountBalance,
  });

  useOnMount(() => {
    if (pristine) {
      dispatchRequest(fetchAccountBalance());
    }
  });

  return {
    ankrBalance: data,
    isLoading,
  };
};
