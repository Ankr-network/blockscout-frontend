import { useMultiRpcSdk } from '../index';
import { LocalGridStore, useLocalGridStore } from '../LocalGridStore';
import { TClientEntity } from './types';
import { makeClients } from './utils';

export const useClients = (): LocalGridStore<TClientEntity> => {
  const backofficeApi = useMultiRpcSdk().getBackofficeGateway();
  const workerApi = useMultiRpcSdk().getWorkerBackofficeGateway();

  const gridStore = useLocalGridStore<TClientEntity>(async (cursor, limit) => {
    const { balances, cursor: responseCursor } =
      await backofficeApi.getBalances({
        cursor,
        limit,
      });
    const counters = await workerApi.getCounters();

    const clients: TClientEntity[] = makeClients(balances, counters);

    return [clients, responseCursor !== '-1'];
  }, []);

  return gridStore;
};
