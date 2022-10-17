import { ICountersEntityMapped } from 'multirpc-sdk';
import { ClientEntity } from 'types';
import { useMultiRpcSdk } from '../index';
import { LocalGridStore, useLocalGridStore } from '../LocalGridStore';
import { makeClients } from './utils';
import { mapCounters } from 'utils/mapCounters';

type Counters = ICountersEntityMapped[] | null;
let counters: Counters = null;

export const usePAYGClients = (): LocalGridStore<ClientEntity> => {
  const backofficeApi = useMultiRpcSdk().getBackofficeGateway();
  const workerApi = useMultiRpcSdk().getBackofficeGateway();

  const gridStore = useLocalGridStore<ClientEntity>(async (cursor, limit) => {
    const { balances, cursor: responseCursor } =
      await backofficeApi.getBalances({
        cursor,
        limit,
      });

    if (!counters) {
      const countersResponse = await workerApi.getCounters();
      counters = mapCounters(countersResponse.result);
    }

    const clients: ClientEntity[] = makeClients(balances, counters);

    return [clients, responseCursor !== '-1'];
  }, []);

  return gridStore;
};
