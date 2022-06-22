import { INodeEntity } from 'multirpc-sdk';

import { LocalGridStore, useLocalGridStore } from './LocalGridStore';
import { useMultiRpcSdk } from './index';

export const useBackofficeNodes = (
  blockchain?: string,
): LocalGridStore<INodeEntity> => {
  const api = useMultiRpcSdk().getWorkerBackofficeGateway();

  const gridStore = useLocalGridStore(async () => {
    return [await api.getNodes(blockchain), false];
  }, [blockchain]);

  return gridStore;
};
