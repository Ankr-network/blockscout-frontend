import { Web3Address } from 'multirpc-sdk';
import { useState } from 'react';
import { useMultiRpcSdk } from '../index';
import { LocalGridStore, useLocalGridStore } from '../LocalGridStore';
import { TUserBlockchainAction } from './types';
import { getBlockchainActions } from './utils';

export const useUserBlockchainActions = ({
  address,
  day_offset,
}: {
  address: Web3Address;
  day_offset: string;
}): {
  gridStore: LocalGridStore<TUserBlockchainAction>;
  storeLoading: boolean;
} => {
  const [storeLoading, setStoreLoading] = useState(false);

  const api = useMultiRpcSdk().getBackofficeGateway();

  const gridStore = useLocalGridStore<TUserBlockchainAction>(async () => {
    setStoreLoading(true);

    const { statement } = await api.getStatement({
      address,
      day_offset,
    });

    setStoreLoading(false);

    const actions: TUserBlockchainAction[] = getBlockchainActions(
      statement.usage || [],
    );

    return [actions, false];
  }, [address, day_offset]);

  return {
    gridStore,
    storeLoading,
  };
};
