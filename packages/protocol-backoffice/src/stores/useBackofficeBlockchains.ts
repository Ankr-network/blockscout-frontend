import { IBlockchainEntity } from 'multirpc-sdk';

import { LocalGridStore, useLocalGridStore } from './LocalGridStore';
import { useMultiRpcSdk } from './index';

export const useBackofficeBlockchains =
  (): LocalGridStore<IBlockchainEntity> => {
    const api = useMultiRpcSdk().getBackofficeGateway();

    const gridStore = useLocalGridStore<IBlockchainEntity>(
      async () => [await api.getBlockchains(), false],
      [],
    );

    return gridStore;
  };
