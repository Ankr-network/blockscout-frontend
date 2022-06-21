import { ITransactionsEntity, Web3Address } from 'multirpc-sdk';

import { useMultiRpcSdk } from './index';
import { LocalGridStore, useLocalGridStore } from './LocalGridStore';

export const useTransactions = ({
  address,
}: {
  address: Web3Address;
}): LocalGridStore<ITransactionsEntity> => {
  const api = useMultiRpcSdk().getBackofficeGateway();

  const gridStore = useLocalGridStore<ITransactionsEntity>(
    async (cursor, limit) => {
      const { transactions, cursor: responseCursor } =
        await api.getTransactions({
          address,
          cursor,
          limit,
        });

      return [transactions, responseCursor !== '-1'];
    },
    [address],
  );

  return gridStore;
};
