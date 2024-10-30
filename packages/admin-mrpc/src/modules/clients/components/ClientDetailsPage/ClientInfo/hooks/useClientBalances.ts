import { Web3Address } from 'multirpc-sdk';
import { useMemo } from 'react';

import { useFetchBalancesQuery } from 'modules/clients/actions/fetchBalances';
import { ClientBalancesMapped } from 'modules/clients/types';
import { ClientMapped } from 'modules/clients/store/clientsSlice';

interface IClientBalancesHookProps {
  client?: ClientMapped;
  isLoadingClients?: boolean;
  address: Web3Address;
}

export const useClientBalances = ({
  client,
  isLoadingClients,
  address,
}: IClientBalancesHookProps) => {
  const {
    data: currentClientBalance,
    isLoading,
    isFetching,
  } = useFetchBalancesQuery({ address });

  const clientBalances: ClientBalancesMapped | undefined = useMemo(() => {
    if (client) {
      return client;
    }

    if (currentClientBalance) {
      return currentClientBalance;
    }

    return undefined;
    // address also should be in dependencies to update balances for new address
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, currentClientBalance, address]);

  const isLoadingBalances =
    (!currentClientBalance && isLoadingClients) || isLoading || isFetching;

  return {
    clientBalances,
    isLoadingBalances,
  };
};
