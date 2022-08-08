import { notification } from 'antd';
import { IBalancesEntity, Web3Address } from 'multirpc-sdk';
import { useCallback, useEffect, useState } from 'react';
import { useMultiRpcSdk } from 'stores';

export const useClientBalance = (
  address: Web3Address,
): { balance: IBalancesEntity | undefined; refetchBalance: () => void } => {
  const [refetchDependancy, triggerRefetch] = useState<boolean>(false);
  const refetchBalance = useCallback(
    () => triggerRefetch(!refetchDependancy),
    [refetchDependancy],
  );

  const [balance, setBalance] = useState<IBalancesEntity | undefined>();

  const backoffice = useMultiRpcSdk().getBackofficeGateway();

  useEffect(() => {
    backoffice
      .getBalances({ search: address })
      .then(({ balances = [] }) => {
        if (balances[0]) {
          setBalance(balances[0]);
        } else {
          throw new Error(`Balance for ${address} not found`);
        }
      })
      .catch(() =>
        notification.error({
          message: `Failed to fetch balance for ${address}`,
        }),
      );
  }, [address, backoffice, refetchDependancy]);

  return { balance, refetchBalance };
};
